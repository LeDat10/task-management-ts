import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5";
import { generateRadomString } from "../../../helpers/generate";

// [POST] /api/v1/users/register
export const register = async (req: Request, res: Response) => {
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        });
    } else {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: md5(req.body.password),
            token: generateRadomString(30)
        });

        const data = await user.save();

        const token = data.token;

        res.json({
            code: 200,
            message: "Tạo tài khoản thành công!",
            token: token
        });
    };

};

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại!"
        });
        return;
    };

    if (user.password !== md5(password)) {
        res.json({
            code: 400,
            message: "Mật khẩu tồn tại!"
        });
        return;
    }

    const token = user.token;

    res.json({
        code: 200,
        message: "Đăng nhập thành công!",
        token: token
    });
};

// [GET] /api/v1/users/detail
export const detail = async (req: Request, res: Response) => {
    res.json({
        code: 200,
        message: "Thành công!",
        info: req["user"]
    });
};