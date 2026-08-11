import { expect, test } from '@playwright/test';

test.describe('contact form', () => {
  test('shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: /send message/i }).click();
    // At least the required fields raise alerts; no navigation/success occurs.
    await expect(page.getByRole('alert').first()).toBeVisible();
    await expect(page.getByText(/we got your message/i)).toBeHidden();
  });

  test('rejects an invalid email inline', async ({ page }) => {
    await page.goto('/contact');
    await page.getByLabel('Name', { exact: false }).fill('Jane Doe');
    await page.getByLabel('Email', { exact: false }).fill('not-an-email');
    await page.getByLabel('Message', { exact: false }).fill('A sufficiently long message here.');
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.getByText(/valid email address/i)).toBeVisible();
  });

  test('submits successfully and shows the success state', async ({ page }) => {
    await page.goto('/contact');
    await page.getByLabel('Name', { exact: false }).fill('Jane Doe');
    await page.getByLabel('Email', { exact: false }).fill('jane@example.com');
    await page
      .getByLabel('Message', { exact: false })
      .fill('I would like to discuss a new website project for my company.');
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.getByText(/thanks — we got your message/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /send another message/i })).toBeVisible();
  });
});

test.describe('newsletter', () => {
  test('validates email then subscribes successfully', async ({ page }) => {
    await page.goto('/');
    const email = page.getByLabel(/subscribe to our newsletter/i);
    await email.scrollIntoViewIfNeeded();

    await email.fill('nope');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.getByText(/valid email address/i)).toBeVisible();

    await email.fill('subscriber@example.com');
    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.getByText(/you.re subscribed/i)).toBeVisible();
  });
});
