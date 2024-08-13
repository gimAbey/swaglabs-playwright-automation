import {test, expect} from '@playwright/test'

test.only('Verify login page content',async ({ page }) =>{
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator("#user-name")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
    await page.waitForTimeout(300);
    await page.reload();
})


test.only('Verify Successful Login',async ({ page }) =>{
    await page.goto('https://www.saucedemo.com/');
    // Since the text box username and password has an ID
    const txtUsername =  await page.locator("#user-name")
    await page.waitForTimeout(300);
    txtUsername.fill("");
    await page.waitForTimeout(300);
    const txtPwd =  await page.locator("#password")
    txtPwd.fill("");
    const btnLogin = await page.locator('#login-button')
    btnLogin.click();
    await page.waitForTimeout(300);
    await expect(page.locator('#shopping_cart_container')).toBeVisible();

    
})