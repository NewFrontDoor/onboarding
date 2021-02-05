const mainQuery = `
*[_type == "main"][0] {
  ...
}
`;

const userQuery = `
*[_type == "user" && email == $email][0]{
  _id,
  name,
  email,
  createdProjects
}
`;

const menuQuery = `
*[_type == "main"][0] {
  menuitems[]{
    text,
    childpages[]{
        "title": text,
        url,
      _type == 'reference' => @-> {
        title,
        slug
      }
    }
  }
}
`;

const footerQuery = `
*[_type == "main"][0] {
  footermenu[]{
    _key,
    text,
    ...childpages-> {
      slug,
      _key
    }
  },
  tagline,
  sociallinks
}
`;

const pageQuery = (slug) => `
*['${slug}' match slug.current][0] {
  ...,
  body[]{
    ...,
    _type == 'reference' => @-> {
      ...,
      blocks[] {
        ...,
        _type == 'reference' => @ -> {
          ...,
          'image': mainImage.asset->url,
          'header': title,
          'link': slug.current
        },
        "image": image.asset->url,
        "link": link[0].url
      }
    },
    markDefs[] {
      ...,
      _type == 'internalLink' => {
          'slug': @.reference->slug.current
      }
    }
  },
  'mainImageSmall': mainImage.asset->metadata.lqip,
  'mainImage': mainImage.asset->url,
  'id': _id,
'pathname': '/' + slug.current
}
`;

const formQuery = (project) => `
*[ _type == "project" && '${project}' match slug.current][0]
`;

export {mainQuery, menuQuery, pageQuery, formQuery, userQuery};
