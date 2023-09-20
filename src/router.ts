import { Router } from "express";
import { validateInput } from "./modules/middleware";
import { createHome, deleteHome, updateHome, updateImage } from "./handlers/home";
import { body } from "express-validator";
import { allFavourite, createFavourite, deleteFavourite } from "./handlers/favourite";
import { allReservation, createReservation, deleteReservation, getReservation, updateReservation } from "./handlers/reservation";

const router = Router();



router.post("/home",
body("title").isString(),
body("description").isString(),
body("guests").isNumeric(),
body("beds").isNumeric(),
body("bedrooms").isNumeric(),
body("bathrooms").isNumeric(),
body("price").isFloat(),
body("category").isString(),
body("lat").isString(),
body("long").isString(),
body("start_date").isString(),
body("end_date").isString(),
createHome);

router.put("/home/:id",body("title").isString(),
body("description").isString(),
body("guests").isNumeric(),
body("beds").isNumeric(),
body("bedrooms").isNumeric(),
body("bathrooms").isNumeric(),
body("price").isFloat(),
body("category").isString(),
body("lat").isString(),
body("long").isString(),
body("start_date").isString(),
body("end_date").isString()
,validateInput,updateHome);

router.put("/updateimage/:id",updateImage);

router.delete("/home/:id", deleteHome);



router.get("/reservations",allReservation);

router.get("/reservations/:id",getReservation);

router.post("/reservations", createReservation);

router.put("/reservations/:id", updateReservation);

router.delete("/reservations/:id",deleteReservation);

/**
 * UpdatePoint
 */

router.get("/favourite", allFavourite);

router.post("/favourite", createFavourite);

router.delete("/favourite/:id",deleteFavourite);

export default router;