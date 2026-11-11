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
        skateparks: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update,
            destroy: mocks.destroy,
        }
    }
}))

import _SkateparksController from "../../controllers/SkateparksController.ts"
import SkateparksController from "../../controllers/SkateparksController.ts";

describe("SkateparksController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test("Return_AllSkateparks_With200Status", async () =>{
        //ülesseade
        mocks.findAll.mockResolvedValue(
            [
                {id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",name:"vi-skatepark-test1"},
                {id: "01a18e66-5fd8-76d4-a0d8-ac475e2d340c",name:"vi-skatepark-test2"},
                {id: "01a18e66-5fdb-73f6-9f37-033664a02b5a",name:"vi-skatepark-test3"}
            ]
        )
        const req = {} as Request
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        //tegevus
        await _SkateparksController.getAll(req, res);

        //kontroll
        expect(mocks.findAll).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([
                {id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",name:"vi-skatepark-test1"},
                {id: "01a18e66-5fd8-76d4-a0d8-ac475e2d340c",name:"vi-skatepark-test2"},
                {id: "01a18e66-5fdb-73f6-9f37-033664a02b5a",name:"vi-skatepark-test3"}
            ])
    })

    test("Return_OneSkateparkById_With200Status" , async() =>{
        const skatepark = 
        {
            id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",
            name:"vi-skatepark-test1",
            city: String(),
            description: String(),
            address: String(),
            latitude: String(),
            longitude: String()
        }
        const req = {
            params: {
                id: skatepark.id
            }
        } as unknown as Request
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response
        mocks.findByPk.mockResolvedValue(skatepark)

        await _SkateparksController.getByID(req,res)

        expect (mocks.findByPk).toHaveBeenCalledExactlyOnceWith(skatepark.id)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(skatepark)
    })

    test("Return_CreatedSkatepark_With201Status", async () =>{
        mocks.create.mockResolvedValue({ id:"4717630-7e57-4cad-9bb1-53ca7d348300"})
            const id = "4717630-7e57-4cad-9bb1-53ca7d348300"
            const req = {
                protocol: "http",
                get: vi.fn(() => "localhost:8080"),
                body: {
                    name:"vi-skatepark-test5",
                    city: "Tallinn",
                    description: "interesting",
                    address: "sopruse pst",
                    latitude: "1231431545-1234123",
                    longitude: "6453634725426.34526.23",
                }
            } as unknown as Request
            const res = {
                location: vi.fn().mockReturnThis(),
                sendStatus: vi.fn().mockReturnThis()
            } as unknown as Response

            await SkateparksController.create(req,res)

            expect(mocks.create).toHaveBeenCalledOnce()
            expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/skateparks/${id}`)
            expect(res.sendStatus).toHaveBeenCalledWith(201)
    })
    
        test("Return_ModifiedSkateparkById_With201Status", async () => {
        const skatepark = {
            id: "01a18e66-5fdb-73f6-9f36-fec1238c7d30",
            name: "vi-skatepark-test1",
            city: "Tallinn",
            description: "Interesting",
            address: "sopruse pst",
            latitude: "58.3776",
            longitude: "26.7290",
            save: vi.fn(),
        };

        mocks.findByPk.mockResolvedValue(skatepark);

        const req = {
            params: {
                id: skatepark.id,
            },
            protocol: "http",
            get: vi.fn(() => "localhost:8080"),
            body: {
                name: "vi-skatepark-test1",
                city: "Tallinn",
                description: "Interesting",
                address: "sopruse pst",
                latitude: "58.3776",
                longitude: "26.7290",
            },
        } as unknown as Request;

        const res = {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response;

        await _SkateparksController.modifyByID(req, res);

        expect(mocks.findByPk).toHaveBeenCalledWith(skatepark.id);
        expect(skatepark.save).toHaveBeenCalledOnce();
        expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/skateparks/${skatepark.id}`);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(skatepark);
    });

    test("Return_NoContentOnDelete_With204Status", async() => {
        const thisid = "01a18e66-5fdb-73f6-9f36-fec1238c7d30"
        const skatepark = {
            id: thisid,
            destroy: vi.fn().mockResolvedValue(undefined)
        }
        mocks.findByPk.mockResolvedValue(skatepark)
        const req = {
            params: {
                id: thisid
            }
        } as unknown as Request
        const res = {
            status:vi.fn().mockReturnThis(),
            send:vi.fn().mockReturnThis(),
        } as unknown as Response

        //äksioñ
        await _SkateparksController.deleteByID(req, res)
    })

})

//write test
