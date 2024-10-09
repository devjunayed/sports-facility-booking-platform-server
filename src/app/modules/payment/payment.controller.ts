import { Request, Response } from "express";
import { paymentSerivices } from "./payment.services";

const confirmation = async(req: Request, res: Response) => {

    const {transactionId, status} = req.query;


    const result = await paymentSerivices.confirmationService(transactionId as string, status as string);

    res.send(result);


}
export const paymentController = {
    confirmation
}