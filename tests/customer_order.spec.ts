import { test, expect } from '@playwright/test'

test.only('A valid shopper makes a purchase', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    // login page
    const txtUsername = await page.locator("#user-name")
    await page.waitForTimeout(300);
    txtUsername.fill("");
    await page.waitForTimeout(300);
    const txtPwd = await page.locator("#password")
    txtPwd.fill("");
    const btnLogin = await page.locator('#login-button')
    btnLogin.click();
    await page.waitForTimeout(300);
    await expect(page.locator('#shopping_cart_container')).toBeVisible();

    // select item from the inventory page
    const itemList = await page.locator(".inventory_item").all();
    
    for (const data of itemList) {
        let txt = await data.locator(".inventory_item_name").innerText();
        if (txt === "Sauce Labs Bike Light") {
            await data.getByText("Add to cart").click();
            await expect(data.getByText("Remove")).toBeVisible();
        }
    }
   

    //navigate to shopping cart
    const lnkShoppingCart = await page.locator(".shopping_cart_link").click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator("#continue-shopping")).toBeVisible();
    await expect(page.locator("#checkout")).toBeVisible();
    await expect(page.locator(".title")).toHaveText("Your Cart");

    //verify shopping cart content
    const lstItems = await page.locator(".cart_item").all();
    for (const data of lstItems) {
        let txt = await data.locator(".inventory_item_name").innerText();
        let lblQty = await data.locator(".cart_quantity").innerText();
        let lblPrice = await data.locator(".inventory_item_price").innerText();

        if (txt === "Sauce Labs Bike Light") {
            await expect(lblPrice).toEqual("$9.99");
           await expect(txt).toEqual("Sauce Labs Bike Light");
            await expect(lblQty).toEqual("1");
            break;
        }
        
    }
    await page.locator("#checkout").click();

    // fill user information form
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator(".title")).toHaveText("Checkout: Your Information");
    await page.locator('#first-name').fill("dfsdfsf")
    await page.getByPlaceholder('Last Name').fill("asdasdasd");
    const postalCode = await page.getByPlaceholder('Zip/Postal Code');
    postalCode.fill("123456");
    const btnContinue = await page.getByRole('button', { name: 'continue' });
    btnContinue.click();
    const btnCancel = await page.getByRole('button', { name: 'cancel' });
    await page.waitForTimeout(300);

    //Checkout Overview
    await expect(page.locator(".title")).toHaveText("Checkout: Overview");
    await page.getByRole('button', { name: 'finish' }).click();
    
    //Checkout Complete
    await expect(page.locator(".title")).toHaveText("Checkout: Complete!");
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
    await expect(page.locator(".complete-text")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    await expect(page.locator("#back-to-products")).toBeVisible();
 

})