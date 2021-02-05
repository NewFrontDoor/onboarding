
import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {Box, Image} from '@chakra-ui/react';
import Link from './link';
import urlFor from '../lib/sanityImg';
// import {Form, validation} from '@newfrontdoor/form';
import PropTypes from 'prop-types';
import {submitForm} from '../lib/sanity-fns';

const CustomStyleSerializer = ({children}) => {
  return <Box textStyle="p">{children}</Box>;
};

CustomStyleSerializer.propTypes = {
  children: PropTypes.string.isRequired
};

const AnchorSerializer = ({children, mark}) => {
  return <span id={mark.id}>{children}</span>;
};

AnchorSerializer.propTypes = {
  children: PropTypes.array.isRequired,
  mark: PropTypes.object.isRequired
};

const ImageSerializer = ({node}) => {
  const align =
    node.wrapping === 'float'
      ? {float: node.alignment, padding: '20px'}
      : {display: 'block', margin: node.alignment === 'center' ? 'auto' : 0};

  return (
    <Image
      sx={{...align, width: `${node.width || '100%'}%`}}
      src={urlFor(node).url()}
    />
  );
};

ImageSerializer.propTypes = {
  node: PropTypes.node.isRequired
};

/*
const FormSerializer = ({node}) => {
  return (
    <Form
      {...node}
      validationFn={values => validation(values, node)}
      blockText={val => <BlockText blocks={val} />}
      submitForm={values => submitForm(values)}
    />
  );
};

FormSerializer.propTypes = {
  node: PropTypes.object.isRequired
};
*/

const InternalLinkSerializer = ({mark, children}) => (
  <Link link={mark.slug}>
    <Box textStyle="a">{children}</Box>
  </Link>
);

const ExternalLinkSerializer = ({mark, children}) => (
  <Link link={mark.href}>{children}</Link>
);

const InlineButtonSerializer = ({children, mark}) => {
  const {action, link, style} = mark;
  if (style === 'ghost') {
    return (
      <Link variant="ghost" sx={{marginLeft: '10px'}} link={link}>
        {children}
      </Link>
    );
  }

  if (style === 'warning') {
    return (
      <Link variant="warning" sx={{marginLeft: '10px'}} link={link}>
        {action}
      </Link>
    );
  }

  return (
    <Link link={link} sx={{marginLeft: '10px'}} link={link}>
      {action}
    </Link>
  );
};

const ButtonSerializer = ({node}) => {
  const {action, link, style} = node;
  if (style === 'ghost') {
    return <Link variant="ghost">{action}</Link>;
  }

  if (style === 'warning') {
    return <Link variant="warning">{action}</Link>;
  }

  return <Link link={link}>{action}</Link>;
};

InternalLinkSerializer.propTypes = {
  children: PropTypes.array.isRequired,
  mark: PropTypes.shape({
    slug: PropTypes.string
  }).isRequired
};

ExternalLinkSerializer.propTypes = {
  children: PropTypes.array.isRequired,
  mark: PropTypes.shape({
    href: PropTypes.string
  }).isRequired
};

const BlockRenderer = props => {
  const style = props.node.style || 'normal';

  const elements = {
    h1: <Box textStyle="h1">{props.children}</Box>,
    h2: <Box textStyle="h2">{props.children}</Box>,
    h3: <Box textStyle="h3">{props.children}</Box>,
    h4: <Box textStyle="h4">{props.children}</Box>,
    h5: <Box textStyle="h5">{props.children}</Box>,
    h6: <Box textStyle="h6">{props.children}</Box>,
  };

  if (/^h\d/.test(style)) return elements[style];

  if (style === 'normal') return <Box textStyle="p">{props.children}</Box>;

  if (style === 'blockquote')
    return <Box textStyle="pageBlurb">{props.children}</Box>;

  if (style === 'warning')
    return <Box textStyle="warning">{props.children}</Box>;

  // Fall back to default handling
  return BlockContent.defaultSerializers.types.block(props);
};

BlockRenderer.propTypes = {
  children: PropTypes.any,
  node: PropTypes.object.isRequired
};

const BlockText = ({blocks}) => {
  return (
    <BlockContent
      blocks={blocks}
      serializers={{
        types: {
          block: BlockRenderer,
          p: CustomStyleSerializer,
          //form: FormSerializer,
          image: ImageSerializer,
          button: ButtonSerializer,
          inlineButton: ButtonSerializer
        },
        marks: {
          anchor: AnchorSerializer,
          internalLink: InternalLinkSerializer,
          link: ExternalLinkSerializer,
          inlineButton: InlineButtonSerializer
        }
      }}
    />
  );
};

BlockText.propTypes = {
  blocks: PropTypes.array.isRequired
};

export default BlockText;
