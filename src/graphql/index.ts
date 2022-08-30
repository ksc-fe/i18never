import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Dict = {
  __typename?: 'Dict';
  key: Scalars['String'];
  translations: Array<Translation>;
};

export type Language = {
  __typename?: 'Language';
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  language: Language;
};


export type MutationLanguageArgs = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dicts: Array<Dict>;
  languages: Array<Language>;
};


export type QueryDictsArgs = {
  source?: InputMaybe<Scalars['String']>;
  values: Array<ValueArg>;
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
  sources: Array<Scalars['String']>;
  value: Scalars['String'];
};

export type TagArg = {
  language: Scalars['String'];
  name: Scalars['String'];
};

export type Translation = {
  __typename?: 'Translation';
  language: Scalars['String'];
  tags: Array<Tag>;
};

export type ValueArg = {
  key: Scalars['String'];
  tags?: InputMaybe<Array<TagArg>>;
};

export type QueryOrCreateDictsQueryVariables = Exact<{
  source: Scalars['String'];
  values: Array<ValueArg> | ValueArg;
}>;


export type QueryOrCreateDictsQuery = { __typename?: 'Query', dicts: Array<{ __typename?: 'Dict', key: string, translations: Array<{ __typename?: 'Translation', language: string, tags: Array<{ __typename?: 'Tag', name: string, value: string }> }> }> };

export type TranslationFragment = { __typename?: 'Translation', language: string, tags: Array<{ __typename?: 'Tag', name: string, value: string }> };

export type TagFragment = { __typename?: 'Tag', name: string, value: string };

export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  name
  value
}
    `;
export const TranslationFragmentDoc = gql`
    fragment Translation on Translation {
  language
  tags {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
export const QueryOrCreateDictsDocument = gql`
    query QueryOrCreateDicts($source: String!, $values: [ValueArg!]!) {
  dicts(source: $source, values: $values) {
    key
    translations {
      ...Translation
    }
  }
}
    ${TranslationFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    QueryOrCreateDicts(variables: QueryOrCreateDictsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<QueryOrCreateDictsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<QueryOrCreateDictsQuery>(QueryOrCreateDictsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'QueryOrCreateDicts', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;