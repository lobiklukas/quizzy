import { Quill } from "react-quill";

const Embed = Quill.import("blots/embed");

export class HideAndSeekBlot extends Embed {
  static create(value: string) {
    const node: HTMLElement = super.create(value);
    node.innerText = value;
    node.classList.add("hideAndSeek", "text-hidden");
    node.setAttribute("data-id", value);
    node.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      node.classList.toggle("text-hidden");
    };
    return node;
  }

  static value(node: HTMLElement) {
    const { id } = node.dataset;
    return id;
  }

  static formats(node: HTMLElement) {
    return node.innerText;
  }
}
HideAndSeekBlot.blotName = "hideAndSeek";
HideAndSeekBlot.tagName = "SPAN";
