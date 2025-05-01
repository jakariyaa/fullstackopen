const loginWith = async (page, username, password) => {

  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Log In' }).click()
}

const createBlog = async (
  page,
  title = 'My first blog',
  author = 'John Doe',
  url = 'https://example.com'
) => {
  await page.getByTestId('create-new-blog').click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByTestId('create').click()
}

export { loginWith, createBlog }