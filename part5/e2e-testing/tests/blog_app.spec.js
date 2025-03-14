const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Empty the test database
    await request.post('http://localhost:3001/api/testing/reset')
    // Create a user in the test database
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'jonas',
        username: 'root',
        password: '1234'
      }
    })
    await page.goto('http://localhost:5173')
  })
  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
  })
  test('Login form is shown by default', async ({ page }) => {
    await expect(page.locator('input[name="Password"]')).toBeVisible()
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('login', () => {
    test('succeds with correct credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()    
      await textboxes[0].fill('root')    
      await textboxes[1].fill('1234')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('jonas logged in')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()    
      await textboxes[0].fill('root')    
      await textboxes[1].fill('wrongpassword')
      await page.getByRole('button', { name: 'login' }).click()
      // await expect(page.getByText('wrong credentials')).toBeVisible()
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')    
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('jonas logged in')).not.toBeVisible()
    })
  })  

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      const textboxes = await page.getByRole('textbox').all()    
      await textboxes[0].fill('root')    
      await textboxes[1].fill('1234')
      await page.getByRole('button', { name: 'login' }).click()
      // await expect(page.getByText('jonas logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').fill('A title')
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByText('A title mesa').waitFor() // mesa is the hardcoded author
      // await page.getByRole('button', { name: 'view' }).waitFor()
      await expect(await page.getByText('A title mesa')).toBeVisible()
    }) 

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').fill('A title')
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByText('A title mesa').waitFor() // mesa is the hardcoded author
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: '+' }).click()
      await expect(await page.getByText('likes: 1')).toBeVisible()
    })

    test('a blog can be removed by the creator', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').fill('A title')
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByText('A title mesa').waitFor() // mesa is the hardcoded author
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'delete' }).click()
      await page.getByRole('button', { name: 'delete' }).waitFor({ state: 'hidden' }) 
      await expect(await page.getByText('A title mesa')).not.toBeVisible()
    })
    
    test('a blog can be removed ONLY by the creator', async ({ page, request }) => {
      // Create another user in the test database
      await request.post('http://localhost:3001/api/users', {
        data: {
          name: 'jonas2',
          username: 'root2',
          password: '12345'
        }
      })

      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('textbox').fill('A title')
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByText('A title mesa').waitFor() // mesa is the hardcoded author
      
      await page.getByRole('button', { name: 'logout' }).click()

      // Login as the second user
      const textboxes = await page.getByRole('textbox').all()    
      await textboxes[0].fill('root2')    
      await textboxes[1].fill('12345')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(await page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByRole('textbox').fill('A title')
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByText('A title mesa').waitFor() // mesa is the hardcoded author
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: '+' }).click()

      await page.getByRole('textbox').fill('B title')
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByText('B title mesa').waitFor() // mesa is the hardcoded author
      await page.getByRole('button', { name: 'view' }).click()
      // const buttonB = await page.locator('li').filter({ hasText: 'B title mesa' }).getByRole('button', { name: '+' })
      // const buttonB = await page.getByText('B title mesa').locator('..').getByRole('button', { name: '+' })
      const blogB = await page.getByRole('listitem').filter({ hasText: 'B title mesa hidewww.me.' })
      const buttonB = await blogB.locator('#button-likes')
      await buttonB.click()
      await blogB.getByText('likes: 1').waitFor()
      await buttonB.click()
      await blogB.getByText('likes: 2').waitFor()
      await buttonB.click()
      await blogB.getByText('likes: 3').waitFor()

      await page.getByRole('textbox').fill('C title')
      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByText('C title mesa').waitFor() // mesa is the hardcoded author
      await page.getByRole('button', { name: 'view' }).click()
      const blogC = await page.getByRole('listitem').filter({ hasText: 'C title mesa hidewww.me.' })
      const buttonC = await blogC.locator('#button-likes')
      await buttonC.click()
      await blogC.getByText('likes: 1').waitFor()
      await buttonC.click()
      await blogC.getByText('likes: 2').waitFor()

      const blogs = await page.getByText('title mesa').all()
      console.log('blogs[1]', blogs[1])
      console.log('blogs[1]', await blogs[1].innerHTML())
      await expect(blogs[0]).toContainText('B title mesa')
      await expect(blogs[1]).toContainText('C title mesa')
      await expect(blogs[2]).toContainText('A title mesa')
    })
  })

})