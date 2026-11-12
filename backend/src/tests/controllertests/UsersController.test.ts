import { describe, it, expect, vi, test, beforeEach } from "vitest";
import type { Request, Response } from "express";
import { v7 as uuidv7 } from "uuid";

const mocks = vi.hoisted(() => ({
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    destroy: vi.fn(),
}))

vi.mock("../../db.ts", () => ({
    db: {
        users: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update,
            destroy: mocks.destroy,
        }
    }
}))

import _UsersController from "../../controllers/UsersController.ts"
import UsersController from "../../controllers/UsersController.ts";

describe("UsersController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test("Return_AllUsers_With200Status", async () =>{
        //ülesseade
        mocks.findAll.mockResolvedValue(
            [
                {id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",display_name:"vi-joonas-test1", email:"j@j1.com"},
                {id: "01a18e66-5fd8-76d4-a0d8-ac475e2d340c",display_name:"vi-joonas-test2", email:"j@j2.com"},
                {id: "01a18e66-5fdb-73f6-9f37-033664a02b5a",display_name:"vi-joonas-test3", email:"j@j3.com"}
            ]
        )
        const req = {} as Request
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        //tegevus
        await _UsersController.getAll(req, res);

        //kontroll
        expect(mocks.findAll).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([
            {id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",display_name:"vi-joonas-test1", email:"j@j1.com"},
            {id: "01a18e66-5fd8-76d4-a0d8-ac475e2d340c",display_name:"vi-joonas-test2", email:"j@j2.com"},
            {id: "01a18e66-5fdb-73f6-9f37-033664a02b5a",display_name:"vi-joonas-test3", email:"j@j3.com"}
            ])
    })

    test("Return_OneUserById_With200Status" , async() =>{
        const user = 
        {
            id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",
            display_name: "joonas",
            email: "j@j.com",
            password_hash: String(),
            role: String(),
            is_blocked: String(),
        }
        const req = {
            params: {
                id: user.id
            }
        } as unknown as Request
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response
        mocks.findByPk.mockResolvedValue(user)

        await _UsersController.getById(req,res)

        expect (mocks.findByPk).toHaveBeenCalledExactlyOnceWith(user.id)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(user)
    })

    test("Return_CreatedUser_With201Status", async () =>{
        mocks.create.mockResolvedValue({ id:"4717630-7e57-4cad-9bb1-53ca7d348300"})
            const id = "4717630-7e57-4cad-9bb1-53ca7d348300"
            const req = {
                protocol: "http",
                get: vi.fn(() => "localhost:8080"),
                body: {
                    display_name: "joonas",
                    email: "j@j.com",
                    password_hash: "Password123",
                    passwordConfirmation: "Password123",
                    role: "User",
                }
            } as unknown as Request
            const res = {
                location: vi.fn().mockReturnThis(),
                sendStatus: vi.fn().mockReturnThis()
            } as unknown as Response

            await UsersController.create(req,res)

            expect(mocks.create).toHaveBeenCalledOnce()
            expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/users/${id}`)
            expect(res.sendStatus).toHaveBeenCalledWith(201)
    })
    
        test("Return_ModifiedUserById_With201Status", async () => {
        const user = {
            id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",
            display_name: "joonas",
            email: "j@j.com",
            password_hash: String(),
            role: "User",
            is_blocked: "blocked",
            save: vi.fn(),
        };

        mocks.findByPk.mockResolvedValue(user);

        const req = {
            params: {
                id: user.id,
            },
            protocol: "http",
            get: vi.fn(() => "localhost:8080"),
            body: {
                display_name: "joonas2",
                email: "j@j2.com",
                password_hash: String(),
                role: "Admin",
                is_blocked: String(),
            },
        } as unknown as Request;

        const res = {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response;

        await _UsersController.modifyById(req, res);

        expect(mocks.findByPk).toHaveBeenCalledWith(user.id);
        expect(user.save).toHaveBeenCalledOnce();
        expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/users/${user.id}`);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(user);
    });

    test("Return_NoContentOnDelete_With204Status", async() => {
        const thisid = "01a18e66-5fdb-73f6-9f36-fec1238c7d30"
        const user = {
            id: thisid,
            destroy: vi.fn().mockResolvedValue(undefined)
        }
        mocks.findByPk.mockResolvedValue(user)
        const req = {
            params: {
                id: thisid
            }
        } as unknown as Request
        const res = {
            status:vi.fn().mockReturnThis(),
            send:vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis(),
        } as unknown as Response

        //äksioñ
        await _UsersController.deleteById(req, res)

        expect(mocks.findByPk).toHaveBeenCalledWith(thisid)
        expect(user.destroy).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith({ error: "No Content" });
    })
    test("Return_404_WhenUserNotFound", async() => {
        const id = "testid"
        mocks.findByPk.mockResolvedValue(null)

        const req = {
            params: { id: id }
        } as unknown as Request

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response

        await _UsersController.getById(req,res)
        
        expect(mocks.findByPk).toHaveBeenCalledWith(id)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.send).toHaveBeenCalledWith({ error: `user with this id does not exist: ${id}`})
    })

})
