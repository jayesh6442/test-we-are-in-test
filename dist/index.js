"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/:name", (req, res) => {
    const name = req.params;
    console.log("we changes if it run or ont");
    console.log(name);
    res.send("hello and welcome to the server" + name);
});
app.listen(3000, () => {
    console.log("app in running");
});
