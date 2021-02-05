import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import {
  MdCollectionsBookmark,
  MdInsertDriveFile,
  MdPeople,
  MdHome
} from 'react-icons/md';

export default () => {
  return S.list()
    .title('Website Content and Settings')
    .items([
      S.listItem()
        .title('Home and Menu')
        .icon(MdHome)
        .child(
          S.editor()
            .title('Home and Menu')
            .id('home')
            .schemaType('main')
            .documentId('home')
        ),
      S.listItem()
        .title('Pages')
        .icon(MdInsertDriveFile)
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Body content blocks')
        .icon(MdCollectionsBookmark)
        .child(
          S.list()
            .title('Body content blocks')
            .items([
              S.listItem()
                .title('Forms')
                .child(S.documentTypeList('form').title('Forms')),
            ])
        ),
      S.listItem()
        .title('Users')
        .icon(MdPeople)
        .child(S.documentTypeList('user').title('Users')),
      S.listItem()
        .title('Projects')
        .icon(MdPeople)
        .child(S.documentTypeList('project').title('Projects'))
    ]);
};
