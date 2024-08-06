import {test, expect} from '@playwright/test'

test.only('Verify login page content',async ({ page }) =>{
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator("#user-name")).toBeVisible();
    await page.waitForTimeout(300);
    await page.reload();
})


test.only('Verify Successful Login',async ({ page }) =>{
    await page.goto('https://www.saucedemo.com/');
    // Since the text box username and password has an ID
    const txtUsername =  await page.locator("#user-name")
    txtUsername.fill("standard_user");
    const txtPwd =  await page.locator("#password")
    txtPwd.fill("secret_sauce");
    const btnLogin = await page.locator('#login-button')
    btnLogin.click();
    
})