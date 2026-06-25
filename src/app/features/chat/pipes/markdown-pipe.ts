import { Pipe, PipeTransform, inject, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';

/** Renders a markdown string into sanitized HTML for binding via [innerHTML]. */
@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  readonly #sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): string {
    if (!value) return '';
    const html = marked.parse(value, { async: false });
    return this.#sanitizer.sanitize(SecurityContext.HTML, html) ?? '';
  }
}
