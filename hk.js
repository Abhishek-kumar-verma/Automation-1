let puppeteer = require("puppeteer");
const codesObj = require("./codes");
const deatailsobj =require("./details");
//yupsororti@biyac.com
//password
let browserStartPromise = puppeteer.launch({
    headless :false,
    defaultViewport:null,
    args:["--start_maximized","--disable notification"]
});
let page;
(async function fn(){
    try{
        let browserobj = await browserStartPromise;
        page = await browserobj.newPage();
        await page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        await page.type("input[type='text']",deatailsobj.email,{delay:100});
        await page.type("input[type='Password']",deatailsobj.password,{delay:100});
        await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled",{delay:100});
        console.log("login sucessfully");
        await waitandclick(".track-item.bold",page);
        //console.log("click on algorithms section");
        await waitandclick("input[value='warmup']",page);
        //console.log("reached target page");
        let questionArr = await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:100});
        await questionSolver(page,questionArr[0],codesObj.answer);
        console.log("first solved");

    } catch(err){
        console.log("err"+err);
    }
})();

function questionSolver(page,question,answer){
    return new Promise(function (resolve,reject){
        (async function fn(){
            try{
                await question.click();
                await waitandclick(".checkbox-input",page);
                await page.waitForSelector("#input-1",{visible:true});
                await page.type("#input-1",answer,{delay:50});
                await page.keyboard.down("Control");
                await page.keyboard.press("A",{delay:100});
                await page.keyboard.press("X",{delay:100});
                await page.keyboard.up("Control");
                await waitandclick(".monaco-editor.no-user-select.vs",page);
                await page.keyboard.down("Control");
                await page.keyboard.press("A",{delay:100});
                await page.keyboard.press("V",{delay:100});
                await page.keyboard.up("Control");
                console.log("code written in editor box");
                await page.click(".hr-monaco__run-code",{delay:50})
                console.log("test case");
                resolve();

            } catch(err){
                console.log("err",err);
                reject();
            }
        })();

    } );
        
}
function waitandclick(selector,cpage){
    return new Promise(async function(resolve,reject){
            try{
                await cpage.waitForSelector(selector,{visible:true});
                await cpage.click(selector,{delay:100})
                resolve();
            } catch(err){
                console.log("err",err);
                reject();
            }
        })
}
