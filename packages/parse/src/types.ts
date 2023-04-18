import {
    TemplateChildNode,
    AttributeNode,
    DirectiveNode,
    SimpleExpressionNode,
} from '@vue/compiler-core';
import { SFCDescriptor } from '@vue/compiler-sfc';
import { ParseError } from '@babel/parser';
import * as t from '@babel/types';

/**
 * parse result
 */
export type TempKeyItem = {
    key: string;
    filename: string;
    loc: StartLocation;
    prefix: string;
    tags: Tags | null;
    jsx?: boolean;
};

/**
 * js parse result
 */
export type JsKeyItem = {
    key: string;
    tags: Tags | null;
    loc: t.SourceLocation;
};

export type Tags = Record<string, string>;

/**
 * js parse result
 */
export type KeyItem = {
    key: string;
    tags: Tags | null;
    params: t.Expression[];
    callback: () => void;
    loc: t.SourceLocation;
    oldIndentifer: string | null;
    newIdentifier?: string;
};

export type JsContext = {
    keys: TempKeyItem[];
    filename: string;
};

export type KeyWithTags = {
    key: string;
    tags: Tags | null;
    identifier: string | null;
};

export type StartLocation = {
    line: number;
    column: number;
};

export type ParseResult<Result> = Result & {
    errors: ParseError[];
};

/**
 * file type
 */
export enum FileType {
    JS = 'js',
    VUE = 'vue',
    PUG = 'pug',
    JSX = 'jsx',
    TSX = 'tsx',
    TS = 'ts',
}

/**
 * walkVueAST
 */
export type WalkTreeOptions = {
    /**
     * Callbacks before traversing each node
     * @param node vue ast node
     * @return
     */
    onEachBefore?(
        node:
            | AttributeNode
            | DirectiveNode
            | TemplateChildNode
            | SimpleExpressionNode
    ): void;
};

export type ReturnType = {
    descriptor: SFCDescriptor;
    keys: TempKeyItem[];
};

export type TagFragment = { __typename?: 'Tag'; name: string; value: string };

export type TranslationDetail = {
    language: string;
    tag: TagFragment;
    isAnswer?: boolean;
};

export interface TransResult {
    transCode: string;
    allKeys: TempKeyItem[];
}
