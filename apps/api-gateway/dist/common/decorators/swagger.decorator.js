"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGetItemsResponse = exports.ApiPostResponse = exports.ApiGetResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const res_dto_1 = require("../dto/res.dto");
const ApiGetResponse = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [{ $ref: (0, swagger_1.getSchemaPath)(model) }],
        },
    }));
};
exports.ApiGetResponse = ApiGetResponse;
const ApiPostResponse = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiCreatedResponse)({
        schema: {
            allOf: [{ $ref: (0, swagger_1.getSchemaPath)(model) }],
        },
    }));
};
exports.ApiPostResponse = ApiPostResponse;
const ApiGetItemsResponse = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)({
        schema: {
            allOf: [
                { $ref: (0, swagger_1.getSchemaPath)(res_dto_1.PageResDto) },
                {
                    properties: {
                        items: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(model) },
                        },
                    },
                    required: ['items'],
                },
            ],
        },
    }));
};
exports.ApiGetItemsResponse = ApiGetItemsResponse;
//# sourceMappingURL=swagger.decorator.js.map