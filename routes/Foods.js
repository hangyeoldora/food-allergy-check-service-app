const express = require("express");
const router = express.Router();
const request = require("request");


router.get("/byId/:seachItem", async (req, res) =>{

    const seachItem = req.params.seachItem;
    let url = "http://openapi.foodsafetykorea.go.kr/api";
    
    let queryParams = 
    // "?" + encodeURIComponent("keyId") + `${process.env.REACT_APP_API_KEY}`;
    "/" + "7bb345a5cae7405fb10f";
    queryParams +=
    "/"  + "C002";
    queryParams +=
    "/"  + "json";
    queryParams +=
    "/" +  encodeURIComponent("1");
    queryParams +=
    "/" + encodeURIComponent("10");
    queryParams +=
    "/PRDLST_NM=" + seachItem;

    request(
        {
            url: url + queryParams,
            method: "GET",
        },
        (error, response, body) => {
            res.send(body);
        }
    );
});

module.exports = router;