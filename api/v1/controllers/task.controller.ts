import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

// [GET] /api/v1/tasks
export const index = async (req: Request, res: Response) => {
    // Find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }

    const find: Find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status.toString();
    };
    // End Find

    // Sort

    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        const sortKey: string = req.query.sortKey.toString();
        sort[sortKey] = req.query.sortValue;
    }
    // End Sort

    // Pagination
    const objPagination = paginationHelper(
        req.query,
        {
            currentPage: 1,
            limit: 2
        }
    );
    // End Pagination

    // Search
    let objSearch = searchHelper(req.query);
    if (req.query.keyword) {
        find.title = objSearch.regex;
    }
    // End Search

    const tasks = await Task.find(find).sort(sort).limit(objPagination.limit).skip(objPagination.skip);
    res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    res.json(task);
};

// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const status: string = req.body.status;

        await Task.updateOne({ _id: id }, { status: status });

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật trạng thái thất bại!"
        });
    }
};

// [PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    try {
        enum Key {
            STATUS = 'status',
            DELETE = 'delete'
        }
        const ids: string[] = req.body.ids;
        const key: string = req.body.key;
        const value: string = req.body.value;

        switch (key) {
            case Key.STATUS:
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                });
                break;
            case Key.DELETE:
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    deleted: true,
                    deletedAt: Date.now()
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại!"
                });
                break;
        }

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công!"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Cập nhật trạng thái thất bại!"
        });
    }
};

// [POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response) => {
    try {
        const product = new Task(req.body);
        const data = await product.save();
        res.json({
            code: 200,
            message: "Tạo sản phẩm thành công!",
            data: data
        });
    } catch (error) {
        res.json({
            code: 200,
            message: "Tạo sản phẩm thất bại!"
        });
    }
};

// [PATCH] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        await Task.updateOne({ _id: id }, req.body);
        res.json({
            code: 200,
            message: "Cập nhật sản phẩm thành công!",
        });
    } catch (error) {
        res.json({
            code: 200,
            message: "Cập nhật sản phẩm thất bại!"
        });
    }
};

// [DELETE] /api/v1/delete/:id
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        await Task.updateOne({ _id: id }, {
            deleted: true,
            deletedAt: Date.now()
        });
        res.json({
            code: 200,
            message: "Xóa sản phẩm thành công!",
        });
    } catch (error) {
        res.json({
            code: 200,
            message: "Xóa sản phẩm thất bại!"
        });
    }
};