import React, { useMemo, useRef } from 'react';
import JoditEditor from 'jodit-react';
import 'jodit/es2021/jodit.min.css';

export default function Editor({ initialData = '', onChange, placeholder = 'Write your blog post content with rich formatting...' }) {
  const editorRef = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Write your blog post content with rich formatting...',
      height: 520,
      minHeight: 400,
      theme: 'default',
      toolbarSticky: false,
      style: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '16px',
        color: '#1e293b',
      },
      buttons: [
        'source',
        '|',
        'bold',
        'strikethrough',
        'underline',
        'italic',
        '|',
        'superscript',
        'subscript',
        '|',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'image',
        'table',
        'link',
        '|',
        'align',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'copyformat',
        '|',
        'fullsize',
        'selectall',
        'preview',
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
      removeButtons: ['file'],
      showXPathInStatusbar: false,
      showCharsCounter: false,
      showWordsCounter: false,
      toolbarAdaptive: true,
    }),
    [placeholder]
  );

  const handleChange = (newContent) => {
    if (typeof onChange === 'function') {
      onChange(null, { getData: () => newContent });
    }
  };

  return (
    <div className="jodit-editor-container border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white text-slate-800">
      <JoditEditor
        ref={editorRef}
        value={initialData}
        config={config}
        onBlur={handleChange}
        onChange={handleChange}
      />
    </div>
  );
}


