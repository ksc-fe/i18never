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

export type DelState = {
  __typename?: 'DelState';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type DelTagOrDictArg = {
  key: Scalars['String'];
  language: Scalars['String'];
  tag: Scalars['String'];
};

export type Dict = {
  __typename?: 'Dict';
  key: Scalars['String'];
  translations: Array<Translation>;
};

export type Dicts = {
  __typename?: 'Dicts';
  dicts: Array<Dict>;
  total: Scalars['Float'];
};

export type Language = {
  __typename?: 'Language';
  label: Scalars['String'];
  name: Scalars['String'];
};

export type LoginMessage = {
  __typename?: 'LoginMessage';
  ussName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DelLanguage: DelState;
  deleteTagOrDict: State;
  editDict: State;
  importDics: State;
  language: Language;
};


export type MutationDelLanguageArgs = {
  label: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteTagOrDictArgs = {
  param: DelTagOrDictArg;
};


export type MutationEditDictArgs = {
  param: UpdateOneDictArg;
};


export type MutationImportDicsArgs = {
  updateDicts: Array<UpdateOneDictArg>;
};


export type MutationLanguageArgs = {
  label: Scalars['String'];
  name: Scalars['String'];
};

export type OutLoginStatus = {
  __typename?: 'OutLoginStatus';
  outLogin: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  Languages: Array<Language>;
  dictList: Dicts;
  dicts: Array<Dict>;
  exportDicts: Array<Dict>;
  getVerionId: VersionId;
  login: LoginMessage;
  outLogin: OutLoginStatus;
};


export type QueryLanguagesArgs = {
  update?: InputMaybe<Scalars['Float']>;
};


export type QueryDictListArgs = {
  key?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  notComplete?: InputMaybe<Array<Scalars['String']>>;
  page?: InputMaybe<Scalars['Int']>;
  sources?: InputMaybe<Array<Scalars['String']>>;
  update?: InputMaybe<Scalars['Float']>;
};


export type QueryDictsArgs = {
  source?: InputMaybe<Scalars['String']>;
  values: Array<ValueArg>;
};


export type QueryExportDictsArgs = {
  key?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  notComplete?: InputMaybe<Array<Scalars['String']>>;
  sources?: InputMaybe<Array<Scalars['String']>>;
};


export type QueryGetVerionIdArgs = {
  source?: InputMaybe<Scalars['String']>;
  values: Array<ValueArg>;
};


export type QueryLoginArgs = {
  cookie: Scalars['String'];
};


export type QueryOutLoginArgs = {
  callback?: InputMaybe<Scalars['String']>;
  cookie: Scalars['String'];
};

export type State = {
  __typename?: 'State';
  message: Scalars['String'];
  success: Scalars['Boolean'];
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

export type UpdateOneDictArg = {
  key: Scalars['String'];
  language: Scalars['String'];
  sources: Array<Scalars['String']>;
  tag: Scalars['String'];
  translation: Scalars['String'];
};

export type ValueArg = {
  key: Scalars['String'];
  tags?: InputMaybe<Array<TagArg>>;
};

export type VersionId = {
  __typename?: 'VersionId';
  Id: Scalars['String'];
};

export type QueryOrCreateDictsQueryVariables = Exact<{
  source: Scalars['String'];
  values: Array<ValueArg> | ValueArg;
}>;


export type QueryOrCreateDictsQuery = { __typename?: 'Query', dicts: Array<{ __typename?: 'Dict', key: string, translations: Array<{ __typename?: 'Translation', language: string, tags: Array<{ __typename?: 'Tag', name: string, value: string }> }> }> };

export type TranslationFragment = { __typename?: 'Translation', language: string, tags: Array<{ __typename?: 'Tag', name: string, value: string }> };

export type TagFragment = { __typename?: 'Tag', name: string, value: string };

export type CreateVersionQueryVariables = Exact<{
  source: Scalars['String'];
  values: Array<ValueArg> | ValueArg;
}>;


export type CreateVersionQuery = { __typename?: 'Query', getVerionId: { __typename?: 'VersionId', Id: string } };

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
export const CreateVersionDocument = gql`
    query CreateVersion($source: String!, $values: [ValueArg!]!) {
  getVerionId(source: $source, values: $values) {
    Id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    QueryOrCreateDicts(variables: QueryOrCreateDictsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<QueryOrCreateDictsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<QueryOrCreateDictsQuery>(QueryOrCreateDictsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'QueryOrCreateDicts', 'query');
    },
    CreateVersion(variables: CreateVersionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateVersionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateVersionQuery>(CreateVersionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateVersion', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;