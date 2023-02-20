const writer = document.getElementById("writer")
const subject = document.getElementById("subject")
const submitBtn = document.getElementById("SubmitBtn")
const cancelBtn = document.getElementById("CancelBtn")
const editor = document.querySelector("#editor")
const mainValue = document.querySelector("#mainCd")

const categoryMain = document.querySelector(".categoryMain")
const input = document.querySelector(".tagify--outside")
const request = axios.create({
    baseURL: "http://52.78.193.209:3000",
    withCredentials: true,
})

const tagify = new Tagify(input, {
    whitelist: ["Hynn", "Baek", "Gyeong"],
    maxTags: 5,
    dropdown: {
        position: "input",
        enabled: 0,
    },
})

CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
    toolbar: {
        items: [
            "heading",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "underline",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "|",
            "outdent",
            "indent",
            "|",
            "undo",
            "redo",
            "-",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "highlight",
            "|",
            "alignment",
            "|",
            "link",
            "imageInsert",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "codeBlock",
            "htmlEmbed",
            "|",
            "specialCharacters",
            "horizontalLine",
            "pageBreak",
            "|",
            "textPartLanguage",
            "|",
            "sourceEditing",
        ],
        shouldNotGroupWhenFull: true,
    },
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true,
        },
    },
    heading: {
        options: [
            { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
            { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
            { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
            { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
            { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
            { model: "heading5", view: "h5", title: "Heading 5", class: "ck-heading_heading5" },
            { model: "heading6", view: "h6", title: "Heading 6", class: "ck-heading_heading6" },
        ],
    },
    placeholder: "글을 작성할 수 있습니다.",
    fontFamily: {
        options: [
            "default",
            "Arial, Helvetica, sans-serif",
            "Courier New, Courier, monospace",
            "Georgia, serif",
            "Lucida Sans Unicode, Lucida Grande, sans-serif",
            "Tahoma, Geneva, sans-serif",
            "Times New Roman, Times, serif",
            "Trebuchet MS, Helvetica, sans-serif",
            "Verdana, Geneva, sans-serif",
        ],
        supportAllValues: true,
    },
    fontSize: {
        options: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, "default"],

        supportAllValues: true,
    },
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true,
            },
        ],
    },
    htmlEmbed: {
        showPreviews: true,
    },
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: "http://",
            toggleDownloadable: {
                mode: "manual",
                label: "Downloadable",
                attributes: {
                    download: "file",
                },
            },
        },
    },
    removePlugins: [
        "CKBox",
        "CKFinder",
        "EasyImage",
        "RealTimeCollaborativeComments",
        "RealTimeCollaborativeTrackChanges",
        "RealTimeCollaborativeRevisionHistory",
        "PresenceList",
        "Comments",
        "TrackChanges",
        "TrackChangesData",
        "RevisionHistory",
        "Pagination",
        "WProofreader",
        "MathType",
    ],
})
    .then((editor) => {
        cancelBtn.addEventListener("click", () => {
            const _pathname = location.pathname.replace("/write", "").replace("/modify", "")
            // console.log(_pathname)
            location.href = `${_pathname}?page=1`
            // location.href = document.referer
        })
        submitBtn.addEventListener("click", (e) => {
            // e.preventDefault()
            if (!subject.value.trim() || !editor.getData().trim()) {
                alert("모든 입력 항목은 필수입니다.")
                return
            }
        })

        var editor = CKEDITOR.instances.editor1
        var data = editor.getData()
        editor.setData(data)
    })
    .catch((error) => {
    })
