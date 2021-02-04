import { IInputs, IOutputs } from "./generated/ManifestTypes";

class EntityReference {
  constructor(public typeName: string, public id: string) {}
}
class AttachedFile implements ComponentFramework.FileObject {
  constructor(
    public annotationId: string,
    public fileName: string,
    public mimeType: string,
    public fileContent: string,
    public fileSize: number
  ) {}
}

interface FileNode {
  id: string;
  file: File;
}
export class uploader2
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private Files: FileNode[] = [];
  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    this.Files = [];
    const UploadForm = this.CreateFormUploadDiv();
    container.appendChild(UploadForm);
  }
  private CreateFormUploadDiv = (): HTMLDivElement => {
    const UploadForm = document.createElement("div");
    const UploadLabel = document.createElement("label");
    UploadLabel.htmlFor = "file-upload";
    UploadLabel.id = "lbl-file-upload";
    UploadLabel.innerText = "Choose Files to Upload";
    const UploadInput = document.createElement("input");
    UploadInput.id = "file-upload";
    UploadInput.type = "file";
    UploadInput.multiple = true;
    UploadInput.addEventListener("change", this.handleBrowse);
    const DragDiv = document.createElement("Div");
    DragDiv.id = "watermarkdiv";
    DragDiv.className = "watermarkdiv";
    DragDiv.innerText = "or drop files here...";

    const catchedfileslist = document.createElement("ol");
    catchedfileslist.id = "catchedfileslist";
    let fileCatcher = this.createDiv("files-catcher", "files", [
      catchedfileslist,
    ]);

    const filesHolder = this.createDiv("file-holder", "", [
      DragDiv,
      fileCatcher,
    ]);
    DragDiv.addEventListener("dragover", this.FileDragHover);
    DragDiv.addEventListener("dragleave", this.FileDragHover);
    DragDiv.addEventListener("drop", this.handleBrowse);
    const UploadButton = document.createElement("button");
    UploadButton.innerText = "Upload";
    UploadButton.className = "buttons";
    UploadButton.addEventListener("click", this.handleUpload);
    const ClearButton = document.createElement("button");
    ClearButton.innerText = "Reset";
    ClearButton.className = "buttons";
    ClearButton.addEventListener("click", this.handleReset);
    const leftDiv = this.createDiv("left-container", "left-container", [
      UploadLabel,
      UploadInput,
      UploadButton,
      ClearButton,
    ]);

    const rightDiv = this.createDiv("right-container", "right-container", [
      filesHolder,
    ]);

    const mainContainer = this.createDiv("main-container", "main-container", [
      leftDiv,
      rightDiv,
    ]);
    UploadForm.appendChild(mainContainer);

    // UploadForm.appendChild(UploadLabel);
    // UploadForm.appendChild(UploadInput);
    // UploadForm.appendChild(DragDiv);
    // UploadForm.appendChild(UploadButton);
    // UploadForm.appendChild(ClearButton);
    return UploadForm;
  };
  private createDiv(
    divid: string,
    classname = "",
    childElements?: HTMLElement[]
  ): HTMLDivElement {
    let _div: HTMLDivElement = document.createElement("div");
    _div.id = divid;
    classname ? (_div.className = classname) : "";
    if (childElements != null && childElements?.length > 0) {
      childElements.forEach((child) => {
        _div.appendChild(child);
      });
    } // return crLableNInput();
    return _div;
  }

  //
  private handleBrowse = (e: any): void => {
    console.log("handleBrowse");
    console.log(e);
    this.FileDragHover(e);
    var files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      this.addFiles(files);
    }
  };
  addFiles(files: FileList) {
    var counter = this.Files.length;
    if (counter > 0 || files.length > 0) {
      const filesDiv = this.$id("watermarkdiv") as HTMLDivElement;
      filesDiv.style.display = "none";
    }
    const fileList = this.$id("catchedfileslist") as HTMLOListElement;
    for (var i = 0; i < files.length; i++) {
      counter++;
      let nodetype = {} as FileNode;
      nodetype.id = "progress" + counter;
      nodetype.file = files[i];
      var fileNode = document.createElement("li");
      const text = document.createTextNode(files[i].name);
      fileNode.appendChild(text);
      fileList.appendChild(fileNode);
      //fileNode.className = "individual-file";
      //this.$id("files-catcher").appendChild(fileNode);
      this.Files[this.Files.length] = nodetype;
    }
  }
  //handles post call to CRM
  private handleUpload = (e: any): void => {
    debugger;
    console.log("handleUpload");
    console.log(e);
  };
  private $id = (id: string): any => {
    return document.getElementById(id);
  };
  //handles clearing all the uploaded files
  private handleReset = (e: any): void => {
    console.log("handleReset");
    console.log(e);
  };

  private FileDragHover = (e: any): void => {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = e.type == "dragover" ? "hover" : "";
    console.log("dragover", e);
  };
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
  }

  public getOutputs(): IOutputs {
    return {};
  }

  public destroy(): void {}
}
