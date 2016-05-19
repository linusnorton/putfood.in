interface Email {

  /**
   * @return {string}
   */
  getSubject(): string;

  /**
   * @return {string}
   */
  getHTML(): string;

}

export default Email;