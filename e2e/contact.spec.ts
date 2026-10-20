import { expect, test, type Page } from "@playwright/test";

// Regression: ISSUE-001 — copy-email button stayed inert when the clipboard write was denied
// Found by /qa on 2026-10-20
// Report: .gstack/qa-reports/run-20261020T113334Z/qa-report-portfolio-two-roan-92-2026-10-20.md

async function openPortfolio(page: Page) {
  await page.goto("/");
  await page.evaluate(() => sessionStorage.setItem("portfolio-intro-seen", "true"));
  await page.reload();
  await expect(page.locator("#preloader")).toHaveCount(0);
}

test("copy email button always gives feedback", async ({ page }) => {
  await openPortfolio(page);

  const button = page.locator(".copy-mail");
  await button.scrollIntoViewIfNeeded();
  await expect(button).toHaveAttribute("data-copy-state", "idle");

  // The clipboard write can be denied by the browser; the control must still
  // report an outcome instead of staying visually inert.
  await button.click();

  await expect(button).not.toHaveAttribute("data-copy-state", "idle");
  await expect(button).toHaveAttribute("data-copy-state", /copied|failed/);
  await expect(button).toContainText(/copied|copy failed/);
});

test("copy email button announces the outcome to assistive tech", async ({ page }) => {
  await openPortfolio(page);

  const button = page.locator(".copy-mail");
  await button.scrollIntoViewIfNeeded();
  await button.click();

  const status = page.locator(".contact-actions [role=status]");
  await expect(status).toHaveText(/copied|select and copy/i);
});
