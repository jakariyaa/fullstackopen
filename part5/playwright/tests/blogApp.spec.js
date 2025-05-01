// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Tester User',
        username: 'testuser',
        password: 'newpassword1233'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login to application')).toBeVisible();
    await expect(page.getByText('username')).toBeVisible();
    await expect(page.getByText('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('newpassword1233')
      await page.getByRole('button', { name: 'Log In' }).click()

      const successMessage = await page.locator('.notification.success')
      await expect(successMessage).toHaveText(`Welcome! testuser successfully logged in`)
      await expect(successMessage).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('wrongpassword')
      await page.getByRole('button', { name: 'Log In' }).click()

      const errorMessage = await page.locator('.notification.error')
      await expect(errorMessage).toHaveText('wrong username or password')
      await expect(errorMessage).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('testuser')
      await page.getByTestId('password').fill('newpassword1233')
      await page.getByRole('button', { name: 'Log In' }).click()
    })

    test('A blog can be created', async ({ page }) => {
      await page.getByTestId('create-new-blog').click()
      await page.getByTestId('title').fill('My first blog')
      await page.getByTestId('author').fill('John Doe')
      await page.getByTestId('url').fill('https://example.com')
      await page.getByTestId('create').click()

      const successMessage = await page.locator('.notification.success')
      await expect(successMessage).toHaveText(`a new blog My first blog by John Doe added`)
      await expect(successMessage).toBeVisible()

      expect(page.getByText('My first blog John Doe')).toBeVisible()
    })

    test('A blog can be liked', async ({ page }) => {

      await page.getByTestId('create-new-blog').click()
      await page.getByTestId('title').fill('My first blog')
      await page.getByTestId('author').fill('John Doe')
      await page.getByTestId('url').fill('https://example.com')
      await page.getByTestId('create').click()

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 2')).toBeVisible()
    })
  })
})