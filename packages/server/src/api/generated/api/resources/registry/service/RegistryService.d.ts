/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../serialization";
import { MirrorfulApi } from "../../../..";
import express from "express";
export interface RegistryServiceMethods {
    createLibrary(req: express.Request<{
        orgId: serializers.OrgId.Raw;
    }, MirrorfulApi.CreateLibraryResponse, MirrorfulApi.CreateLibraryRequest, never>, res: {
        send: (responseBody: MirrorfulApi.CreateLibraryResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    updateFile(req: express.Request<{
        orgId: serializers.OrgId.Raw;
        fileId: serializers.FileId.Raw;
    }, MirrorfulApi.FileResponse, MirrorfulApi.UpdateFileRequest, never>, res: {
        send: (responseBody: MirrorfulApi.FileResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getFile(req: express.Request<{
        orgId: serializers.OrgId.Raw;
        fileId: serializers.FileId.Raw;
    }, MirrorfulApi.FileResponse, never, never>, res: {
        send: (responseBody: MirrorfulApi.FileResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    getStore(req: express.Request<{
        orgId: serializers.OrgId.Raw;
        storeId: serializers.StoreId.Raw;
    }, MirrorfulApi.MirrorfulStore, never, never>, res: {
        send: (responseBody: MirrorfulApi.MirrorfulStore) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    updateStore(req: express.Request<{
        orgId: serializers.OrgId.Raw;
        storeId: serializers.StoreId.Raw;
    }, MirrorfulApi.MirrorfulStore, MirrorfulApi.MirrorfulStore, never>, res: {
        send: (responseBody: MirrorfulApi.MirrorfulStore) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class RegistryService {
    private readonly methods;
    private router;
    constructor(methods: RegistryServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}
