import { expect, test, type Page } from "@playwright/test";

async function openPortfolio(page: Page, path = "/") {
  await page.goto(path);
  await page.evaluate(() => sessionStorage.setItem("portfolio-intro-seen", "true"));
  await page.reload();
  await expect(page.locator("#preloader")).toHaveCount(0);
}

test("renders the complete portfolio without horizontal overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await openPortfolio(page);

  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("Shreyash Tirpude");
  await expect(page.locator("main#main-content")).toHaveCount(1);
  await expect(page.locator("#about, #experience, #work, #skills, #showcase, #faq, #contact")).toHaveCount(7);

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  expect(errors).toEqual([]);
});

test("navigation reaches selected work", async ({ page }) => {
  await openPortfolio(page);
  await page.getByRole("link", { name: "See selected work" }).click();

  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  await expect(page.locator('a[href="#work"][aria-current="location"]')).not.toHaveCount(0);
  const firstProjectVisual = page.locator(".case-visual-shell").first();
  await firstProjectVisual.scrollIntoViewIfNeeded();
  await expect(firstProjectVisual).toHaveClass(/in/);
  await expect
    .poll(() => firstProjectVisual.locator(".case-visual").evaluate((element) => getComputedStyle(element).clipPath))
    .not.toContain("100%");
});

test("FAQ is keyboard operable", async ({ page }) => {
  await openPortfolio(page, "/#faq");
  const trigger = page.getByRole("button", { name: /How do you approach responsible disclosure/ });

  await trigger.focus();
  await trigger.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(`#${await trigger.getAttribute("aria-controls")}`)).toBeVisible();
  await expect(trigger).toBeVisible();
  await expect
    .poll(() => trigger.evaluate((element) => getComputedStyle(element.closest(".rv")!).opacity))
    .toBe("1");
});

test("reduced motion keeps content available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openPortfolio(page);

  await expect(page.locator(".preloader")).toHaveCount(0);
  await expect(page.locator("#showcase .scene")).toHaveCount(3);
  await expect(page.locator("#showcase .scene").first()).toBeVisible();
  await expect(page.locator("html")).not.toHaveClass(/lenis/);
});

test("mobile menu contains focus and restores it when closed", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile navigation is only shown below 900px");
  await openPortfolio(page);

  const menuButton = page.locator(".menu-button");
  await expect(menuButton).toHaveAccessibleName("Menu");
  await menuButton.click();
  await expect(menuButton).toHaveAccessibleName("Close");
  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNav).toBeVisible();
  await expect(mobileNav.getByRole("link", { name: /About/ })).toBeFocused();

  await page.keyboard.press("Shift+Tab");
  await expect(menuButton).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(mobileNav).toBeHidden();
  await expect(menuButton).toBeFocused();
});
