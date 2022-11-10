import {
    TemplateChildNode,
    AttributeNode,
    DirectiveNode,
} from '@vue/compiler-core';

/**
 * parse result
 */
export type KeyItem = {
    key: string;
    filename: string;
    loc: SourceLocation;
};

export type SourceLocation = {
    start: {
        line: number;
        column: number;
    };
};

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
        node: AttributeNode | DirectiveNode | TemplateChildNode
    ): void;
};
