/* global NSPasteboard, NSPasteboardTypeString */
import { toSJSON } from 'sketchapp-json-plugin';

const copyToClipboard = (text) => {
  const pasteboard = NSPasteboard.generalPasteboard();
  pasteboard.declareTypes_owner([NSPasteboardTypeString], null);
  pasteboard.setString_forType(text, NSPasteboardTypeString);
};

const parseAndStringify = input =>
  JSON.stringify(JSON.parse(input), null, 2);

export default function ({ document, selection }) {
  const on = selection.firstObject() || document.currentPage().layers().firstObject();

  try {
    copyToClipboard(parseAndStringify(toSJSON(on)));
    document.showMessage('copied!');
  } catch (e) {
    document.showMessage('something went wrong 😭');
  }
}
