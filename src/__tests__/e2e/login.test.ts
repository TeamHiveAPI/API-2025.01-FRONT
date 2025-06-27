import { Builder, By, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("Login E2E Test", () => {
  jest.setTimeout(60000); // Aumenta o timeout para 60 segundos para acomodar o teste de login válido
  let driver: WebDriver;

  beforeAll(async () => {
    // const options = new chrome.Options().addArguments('--headless=new');
    const options = new chrome.Options();
    options.addArguments("--headless=new");
    // const options = new chrome.Options().headless(false);

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("teste com login valido", async () => {
    await driver.get("http://localhost:5173/login");

    const testEmail = "teste@teste.com";
    const testPassword = "teste";

    // Aguarda o campo de e-mail aparecer
    const emailInput = await driver.wait(
      until.elementLocated(By.className("login_input")),
      10000
    );
    await emailInput.clear();
    await emailInput.sendKeys(testEmail);

    // Aguarda o campo de senha
    const passwordInput = await driver.wait(
      until.elementLocated(By.css('input[type="password"]')),
      10000
    );
    await passwordInput.clear();
    await passwordInput.sendKeys(testPassword);

    // Clica no botão de login
    const loginButton = await driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      10000
    );
    await driver.wait(until.elementIsEnabled(loginButton), 10000);
    await loginButton.click();

    // Aguarda o redirecionamento para o dashboard
    await driver.wait(
      until.urlContains("/dashboard"),
      10000,
      "Timeout aguardando redirecionamento para o dashboard"
    );

    // Aguarda o localStorage ser preenchido com o token
    await driver.wait(
      async () => {
        const token = await driver.executeScript(
          'return localStorage.getItem("token");'
        );
        return Boolean(token);
      },
      10000,
      "Token não encontrado no localStorage após login"
    );

    // Coleta os dados do localStorage após login
    // const storageData = await driver.executeScript(`
    //   return {
    //     token: localStorage.getItem('token'),
    //     user_email: localStorage.getItem('user_email'),
    //     user_nivel: localStorage.getItem('user_nivel'),
    //     user_id: localStorage.getItem('user_id'),
    //     user_nome: localStorage.getItem('user_nome')
    //   };
    // `);
    const storageData = (await driver.executeScript(() => {
      return {
        token: localStorage.getItem("token"),
        user_email: localStorage.getItem("user_email"),
        user_nivel: localStorage.getItem("user_nivel"),
        user_id: localStorage.getItem("user_id"),
        user_nome: localStorage.getItem("user_nome"),
      };
    })) as {
      token: string | null;
      user_email: string | null;
      user_nivel: string | null;
      user_id: string | null;
      user_nome: string | null;
    };

    console.log("\nDados do localStorage após login:", storageData);

    // Verifica se os dados estão corretamente armazenados
    expect(storageData.token).not.toBeNull();
    expect(storageData.user_email).toBe(testEmail);
    expect(storageData.user_nivel).not.toBeNull();
    expect(storageData.user_id).not.toBeNull();
    expect(storageData.user_nome).not.toBeNull();

    // Confirma que estamos na página correta
    const finalUrl = await driver.getCurrentUrl();
    expect(finalUrl).toContain("/dashboard");
  });
});
