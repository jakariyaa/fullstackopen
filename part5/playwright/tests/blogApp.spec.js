// @ts-check
import { test, expect } from '@playwright/test';
import { createBlog, loginWith } from './helper';

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
      await loginWith(page, 'testuser', 'newpassword1233')

      const successMessage = await page.locator('.notification.success')
      await expect(successMessage).toHaveText(`Welcome! testuser successfully logged in`)
      await expect(successMessage).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrongpassword')

      const errorMessage = await page.locator('.notification.error')
      await expect(errorMessage).toHaveText('wrong username or password')
      await expect(errorMessage).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page, request }) => {
      await loginWith(page, 'testuser', 'newpassword1233')
    })

    test('A blog can be created', async ({ page }) => {
      await createBlog(page, 'My first blog', 'John Doe', 'https://example.com')

      const successMessage = await page.locator('.notification.success')
      await expect(successMessage).toHaveText(`a new blog My first blog by John Doe added`)
      await expect(successMessage).toBeVisible()

      expect(page.getByText('My first blog John Doe')).toBeVisible()
    })

    test('A blog can be liked', async ({ page }) => {
      await createBlog(page)

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.getByText('likes 2')).toBeVisible()
    })

    test('A blog can be deleted by the creator', async ({ page }) => {
      await createBlog(page)

      await page.getByRole('button', { name: 'view' }).click()
      await page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe('confirm')
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('My first blog John Doe')).not.toBeVisible()
    })

    test('Only the creator sees the delete button', async ({ page, request }) => {
      await createBlog(page)
      await page.getByRole('button', { name: 'Log Out' }).click()
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Another User',
          username: 'anotheruser',
          password: 'anotherpassword'
        }
      })
      await loginWith(page, 'anotheruser', 'anotherpassword')
      await page.getByRole('button', { name: 'view' }).click()
      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).not.toBeVisible()
    })
    test('Blogs are displayed in descending order of likes', async ({ page }) => {
      await createBlog(page, 'First Blog', 'Author One', 'https://first.com')
      await expect(page.getByText('First Blog Author One')).toBeVisible()
      await page.getByRole('button', { name: 'cancel' }).click()

      await createBlog(page, 'Second Blog', 'Author Two', 'https://second.com')
      await expect(page.getByText('Second Blog Author Two')).toBeVisible()
      await page.getByRole('button', { name: 'cancel' }).click()

      await createBlog(page, 'Third Blog', 'Author Three', 'https://third.com')
      await expect(page.getByText('Third Blog Author Three')).toBeVisible()
      await page.getByRole('button', { name: 'cancel' }).click()

      await page.getByRole('button', { name: 'view' }).nth(0).click();
      await page.getByRole('button', { name: 'like' }).nth(0).click();
      await expect(page.getByText('likes 1')).toBeVisible();

      await page.getByRole('button', { name: 'view' }).nth(0).click();
      await page.getByRole('button', { name: 'like' }).nth(1).click();
      await page.getByRole('button', { name: 'like' }).nth(1).click();
      await expect(page.getByText('likes 2')).toBeVisible();

      const blogTitles = await page.locator('.blog').allTextContents();
      expect(blogTitles[0]).toContain('Second Blog Author Two');
      expect(blogTitles[1]).toContain('First Blog Author One');
      expect(blogTitles[2]).toContain('Third Blog Author Three');
    })
  })
})