import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome'; // 👈 Importação correta com tipagem

describe('Login E2E Test', () => {
  jest.setTimeout(30000);
  let driver: WebDriver;

  beforeAll(async () => {
    const options = new chrome.Options().addArguments('--headless=new');


    driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options) // 👈 Aqui funciona
  .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('teste com login invalido', async () => {
    await driver.get('http://localhost:5173/login');

    await driver.findElement(By.className('login_input')).sendKeys('invalid@email.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('wrongpassword');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(
      until.alertIsPresent(),
      10000,
      'Timeout esperando alerta de erro'
    );

    const alert = await driver.switchTo().alert();
    expect(await alert.getText()).toBe('Login falhou. Verifique suas credenciais.');
    await alert.accept();
  });

  test('teste com login valido', async () => {
    await driver.get('http://localhost:5173/login');

    await driver.findElement(By.className('login_input')).sendKeys('teste@teste.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('teste');
    await driver.findElement(By.css('button[type="submit"]')).click();

    try {
      const alert = await driver.switchTo().alert();
      await alert.dismiss();
    } catch (e) {
      // Ignora se não houver alerta
    }

    await driver.wait(
      until.urlContains('/dashboard'),
      10000,
      'Timeout esperando redirecionamento para o dashboard'
    );
  });
});
