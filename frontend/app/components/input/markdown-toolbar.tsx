/** @jsx createElement */
import { createElement, Component, ChangeEvent } from 'react';
import '@github/markdown-toolbar-element';
import BoldIcon from './markdown-toolbar-icons/bold-icon';
import HeaderIcon from './markdown-toolbar-icons/header-icon';
import ItalicIcon from './markdown-toolbar-icons/italic-icon';
import QuoteIcon from './markdown-toolbar-icons/quote-icon';
import CodeIcon from './markdown-toolbar-icons/code-icon';
import LinkIcon from './markdown-toolbar-icons/link-icon';
import ImageIcon from './markdown-toolbar-icons/image-icon';
import UnorderedListIcon from './markdown-toolbar-icons/unordered-list-icon';
import OrderedListIcon from './markdown-toolbar-icons/ordered-list-icon';

interface Props {
  textareaId: string;
  uploadImages: (files: File[]) => Promise<void>;
  allowUpload: boolean;
}

const boldLabel = 'Add bold text <cmd-b>';
const headerLabel = 'Add header text';
const italicLabel = 'Add italic text <cmd-i>';
const quoteLabel = 'Insert a quote';
const codeLabel = 'Insert a code';
const linkLabel = 'Add a link <cmd-k>';
const unorderedListLabel = 'Add a bulleted list';
const orderedListLabel = 'Add a numbered list';
const attachImageLabel = 'Attach the image, drag & drop or paste from clipboard';

export default class MarkdownToolbar extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.uploadImages = this.uploadImages.bind(this);
  }
  async uploadImages(e: ChangeEvent<HTMLInputElement>) {
    const currentTarget = e.currentTarget;
    if (!(this.props.allowUpload && currentTarget && currentTarget.files && currentTarget.files.length !== 0)) return;
    const files = Array.from(currentTarget.files);
    await this.props.uploadImages(files);
    currentTarget.value = '';
  }
  render() {
    const props = this.props;

    return (
      <markdown-toolbar class="input__toolbar" for={props.textareaId}>
        <div className="input__toolbar-group">
          <md-header class="input__toolbar-item" title={headerLabel} aria-label={headerLabel}>
            <HeaderIcon />
          </md-header>
          <md-bold class="input__toolbar-item" title={boldLabel} aria-label={boldLabel}>
            <BoldIcon />
          </md-bold>
          <md-italic class="input__toolbar-item" title={italicLabel} aria-label={italicLabel}>
            <ItalicIcon />
          </md-italic>
        </div>
        <div className="input__toolbar-group">
          <md-quote class="input__toolbar-item" title={quoteLabel} aria-label={quoteLabel}>
            <QuoteIcon />
          </md-quote>
          <md-code class="input__toolbar-item" title={codeLabel} aria-label={codeLabel}>
            <CodeIcon />
          </md-code>
          <md-link class="input__toolbar-item" title={linkLabel} aria-label={linkLabel}>
            <LinkIcon />
          </md-link>
          {this.props.allowUpload ? (
            <label className="input__toolbar-item" title={attachImageLabel} aria-label={attachImageLabel}>
              <input multiple className="input__toolbar-file-input" type="file" onChange={this.uploadImages} />
              <ImageIcon />
            </label>
          ) : null}
        </div>
        <div className="input__toolbar-group">
          <md-unordered-list class="input__toolbar-item" title={unorderedListLabel} aria-label={unorderedListLabel}>
            <UnorderedListIcon />
          </md-unordered-list>
          <md-ordered-list class="input__toolbar-item" title={orderedListLabel} aria-label={orderedListLabel}>
            <OrderedListIcon />
          </md-ordered-list>
        </div>
      </markdown-toolbar>
    );
  }
}
