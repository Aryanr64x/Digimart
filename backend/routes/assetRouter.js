import express from "express";
import {getAsset, getAssets} from "../controllers/assetController.js";
const assetRouter = express.Router();

assetRouter.get("", getAssets);
assetRouter.get("/:id", getAsset);

export  default  assetRouter;