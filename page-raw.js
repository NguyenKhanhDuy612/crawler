const removeNewlinesAndTabs = (inputString) => {
	if (typeof inputString !== "string") return inputString;
	return inputString.replace(/[\t\n]+/g, "");
};

const checkClassForm = (className, classCheck) => {
	const words = className.split(" ");
	return words.find((word) => word.includes(classCheck));
};

const getIdHsForm = (string) => {
	if (typeof string !== "string") return "";
	return string
		.replace("hsForm_", "")
		.replace("hs-form-", "")
		.replace("hsPopUpForm-", "");
};

const getFormIdFromFormAction = (formAction, formId, textSplit = "/") => {
	if (typeof formAction !== "string") return formId;
	let textSplitAction = formAction;
	try {
		const formActionUrl = new URL(formAction);
		textSplitAction = formActionUrl?.pathname || formAction;
	} catch (error) { }
	const formActionSplit = textSplitAction.split(textSplit);
	const newFormId = formActionSplit[formActionSplit.length - 1];
	return newFormId || formId;
};

const uuidPart = (string) => {
	if (typeof string !== "string") return string;

	const parts = string.split("_");

	return parts[1];
};

const getFormId = (formIdParam, formClassParam, formAction, dataFormId) => {
	let formId = formIdParam;
	let formClass = formClassParam;
	if (formId) {
		switch (true) {
			case formId.includes("hsForm_") ||
				formId.includes("hs-form-") ||
				formId.includes("hsPopUpForm-"):
				formId = dataFormId ? dataFormId : getIdHsForm(formId);
				break;
			case formId.includes("gform_"):
				break;
			case formId.includes("pardot-form"):
				const newFormId = getFormIdFromFormAction(formAction, formId);
				formId = newFormId || formId;
				break;
			case formId.includes("mktoForm_"):
				formId = uuidPart(formId);
				break;
			case formId.includes("fluentform_"):
				break;
			case formId.includes("uf-form"):
				break;
			case formId.includes("_form_"):
				break;
			case formId.includes("mc-embedded"):
				break;
			case formId.includes("webform-submission") ||
				formId.includes("webform-client-form"):
				break;
			default:
				if (formClass) {
					// const classCF7 = checkClassForm(formClass, 'wpcf7-form');
					// if (classCF7) {
					//      const newFormId = getFormIdFromFormAction(formAction, formId, '/#');
					//      formId = newFormId || formId;
					// }
				}
				break;
		}
	} else if (formClass) {
		// Check contact form 7
		const classCF7 = checkClassForm(formClass, "wpcf7-form");
		if (classCF7) {
			const newFormId = getFormIdFromFormAction(formAction, formId, "/#");
			formId = newFormId || formId;
		}
	}

	return formId;
};

function checkElement(element) {
	const hasId = ids.includes(element.id);
	const hasClass = [...element.classList].some((className) =>
		classes.includes(className)
	);
	return hasId || hasClass;
}

const md5 = (inputString) => {
	var hc = "0123456789abcdef";

	function rh(n) {
		var j,
			s = "";
		for (j = 0; j <= 3; j++)
			s +=
				hc.charAt((n >> (j * 8 + 4)) & 0x0f) + hc.charAt((n >> (j * 8)) & 0x0f);
		return s;
	}

	function ad(x, y) {
		var l = (x & 0xffff) + (y & 0xffff);
		var m = (x >> 16) + (y >> 16) + (l >> 16);
		return (m << 16) | (l & 0xffff);
	}

	function rl(n, c) {
		return (n << c) | (n >>> (32 - c));
	}

	function cm(q, a, b, x, s, t) {
		return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
	}

	function ff(a, b, c, d, x, s, t) {
		return cm((b & c) | (~b & d), a, b, x, s, t);
	}

	function gg(a, b, c, d, x, s, t) {
		return cm((b & d) | (c & ~d), a, b, x, s, t);
	}

	function hh(a, b, c, d, x, s, t) {
		return cm(b ^ c ^ d, a, b, x, s, t);
	}

	function ii(a, b, c, d, x, s, t) {
		return cm(c ^ (b | ~d), a, b, x, s, t);
	}

	function sb(x) {
		var i;
		var nblk = ((x.length + 8) >> 6) + 1;
		var blks = new Array(nblk * 16);
		for (i = 0; i < nblk * 16; i++) blks[i] = 0;
		for (i = 0; i < x.length; i++)
			blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
		blks[i >> 2] |= 0x80 << ((i % 4) * 8);
		blks[nblk * 16 - 2] = x.length * 8;
		return blks;
	}
	var i,
		x = sb("" + inputString),
		a = 1732584193,
		b = -271733879,
		c = -1732584194,
		d = 271733878,
		olda,
		oldb,
		oldc,
		oldd;
	for (i = 0; i < x.length; i += 16) {
		olda = a;
		oldb = b;
		oldc = c;
		oldd = d;
		a = ff(a, b, c, d, x[i + 0], 7, -680876936);
		d = ff(d, a, b, c, x[i + 1], 12, -389564586);
		c = ff(c, d, a, b, x[i + 2], 17, 606105819);
		b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
		a = ff(a, b, c, d, x[i + 4], 7, -176418897);
		d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
		c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
		b = ff(b, c, d, a, x[i + 7], 22, -45705983);
		a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
		d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
		c = ff(c, d, a, b, x[i + 10], 17, -42063);
		b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
		a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
		d = ff(d, a, b, c, x[i + 13], 12, -40341101);
		c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
		b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
		a = gg(a, b, c, d, x[i + 1], 5, -165796510);
		d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
		c = gg(c, d, a, b, x[i + 11], 14, 643717713);
		b = gg(b, c, d, a, x[i + 0], 20, -373897302);
		a = gg(a, b, c, d, x[i + 5], 5, -701558691);
		d = gg(d, a, b, c, x[i + 10], 9, 38016083);
		c = gg(c, d, a, b, x[i + 15], 14, -660478335);
		b = gg(b, c, d, a, x[i + 4], 20, -405537848);
		a = gg(a, b, c, d, x[i + 9], 5, 568446438);
		d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
		c = gg(c, d, a, b, x[i + 3], 14, -187363961);
		b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
		a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
		d = gg(d, a, b, c, x[i + 2], 9, -51403784);
		c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
		b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
		a = hh(a, b, c, d, x[i + 5], 4, -378558);
		d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
		c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
		b = hh(b, c, d, a, x[i + 14], 23, -35309556);
		a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
		d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
		c = hh(c, d, a, b, x[i + 7], 16, -155497632);
		b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
		a = hh(a, b, c, d, x[i + 13], 4, 681279174);
		d = hh(d, a, b, c, x[i + 0], 11, -358537222);
		c = hh(c, d, a, b, x[i + 3], 16, -722521979);
		b = hh(b, c, d, a, x[i + 6], 23, 76029189);
		a = hh(a, b, c, d, x[i + 9], 4, -640364487);
		d = hh(d, a, b, c, x[i + 12], 11, -421815835);
		c = hh(c, d, a, b, x[i + 15], 16, 530742520);
		b = hh(b, c, d, a, x[i + 2], 23, -995338651);
		a = ii(a, b, c, d, x[i + 0], 6, -198630844);
		d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
		c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
		b = ii(b, c, d, a, x[i + 5], 21, -57434055);
		a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
		d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
		c = ii(c, d, a, b, x[i + 10], 15, -1051523);
		b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
		a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
		d = ii(d, a, b, c, x[i + 15], 10, -30611744);
		c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
		b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
		a = ii(a, b, c, d, x[i + 4], 6, -145523070);
		d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
		c = ii(c, d, a, b, x[i + 2], 15, 718787259);
		b = ii(b, c, d, a, x[i + 9], 21, -343485551);
		a = ad(a, olda);
		b = ad(b, oldb);
		c = ad(c, oldc);
		d = ad(d, oldd);
	}
	return rh(a) + rh(b) + rh(c) + rh(d);
};

class FormField {
	static fieldNum = 0;
	static ignoredFieldNames = [
		"__EVENTTARGET",
		"__VIEWSTATE",
		"__EVENTVALIDATION",
		"__VIEWSTATEGENERATOR",
		"__EVENTARGUMENT",
		"utf8",
	];
	static attributes = [
		"placeholder",
		"data-label-inside",
		"type",
		"name",
		"id",
		"class",
		"label",
	];
	static elements = ["input", "select", "textarea", "button"];

	constructor(input, form) {
		this.input = input;
		this.form = form;
		FormField.fieldNum++;
	}

	get value() {
		if (this.valid) {
			return {
				[this.formattedName]: this.input.value,
			};
		}
	}

	get formattedName() {
		return this.sanitizeName(this.parseName);
	}

	get valid() {
		return [
			!this.input.value || !this.input.value.length,
			FormField.ignoredFieldNames.includes(this.input.getAttribute("name")),
			this.checkboxOrRadio() && !this.input.checked,
			this.input.type === "submit",
			this.input.type === "button",
		].every((condition) => !condition);
	}

	get parseName() {
		return (
			[this.labelName, this.placeholder, this.input.name].filter((name) =>
				this.validLabelName(name)
			)[0] ||
			this.labelName ||
			this.placeholder ||
			this.input.name ||
			this.artificialName
		);
	}

	validLabelName(name) {
		if (!name) return false;
		const cleanedName = name.replace(/[^a-zA-Z]/g, "");
		return cleanedName && cleanedName.length > 2;
	}

	sanitizeName(name) {
		if (name) {
			return name
				.replace(/[\[\]]+/g, " ")
				.replace(/\n+/g, "")
				.replace(/:?\s*$/, "")
				.replace(/^\s+/, "")
				.replace(/^\*\s+/, "");
		}
	}

	get labelName() {
		return this.checkboxOrRadio()
			? this.checkboxOrRadioLabelName
			: this.possibleLabelName;
	}

	get checkboxOrRadioLabelName() {
		const label = this.form.querySelector(
			`label[for="${this.input.getAttribute("name")}"]`
		);
		return label ? label.innerText : undefined;
	}

	get possibleLabelName() {
		let label = this.form.querySelector(
			`label[for="${this.input.getAttribute("id")}"]`
		);
		const parent = this.input.parentElement;
		if (parent && parent.nodeName === "LABEL") {
			label = parent;
		}
		return label && this.isDropDown()
			? label.firstChild.textContent
			: label
				? label.innerText
				: this.unattachedLabelName();
	}

	unattachedLabelName() {
		const previousSibling = this.input.previousElementSibling;
		if (previousSibling && previousSibling.localName === "label") {
			return previousSibling.textContent;
		}
	}

	get placeholder() {
		if (!this.checkboxOrRadio()) {
			return this.input.getAttribute("placeholder");
		}
	}

	get artificialName() {
		return `form_field_${FormField.fieldNum}`;
	}

	checkboxOrRadio() {
		return ["radio", "checkbox"].includes(this.input.type);
	}

	isDropDown() {
		return this.input.nodeName === "SELECT";
	}
}

class FormParser {
	constructor() { }

	parseFormContent(form) {
		const inputs = this.formInputs(form);
		let inputNames = [];
		const formData = inputs
			.filter((input) => input.type !== "text")
			.reduce((acc, input, index) => {
				const inputParser = new FormField(input, form);
				let value = inputParser.value;
				inputNames.push(inputParser.formattedName);
				const key = Object.keys(value || {})[0];

				if (acc[key] && index > 0) {
					input = input.cloneNode();
					if (["radio", "checkbox"].includes(input.type)) {
						input.value = [acc[key], input.value].join(", ");
					} else {
						const count = inputs.filter((el) => el.name === input.name).length;
						input.name = `${input.name}(${count})`;
					}
					value = new FormField(input, form).value;
				}
				return {
					...acc,
					...value,
				};
			}, {});

		return this.filterContentsByName(formData, inputNames);
	}

	// Parses metadata for a single input
	parseInputMetadata(form) {
		const inputs = this.formInputs(form);
		let inputNames = [];
		const metadata = inputs.reduce((acc, input) => {
			inputNames.push(input.name);
			return {
				...acc,
				...this.singleInputMetadata(input, form),
			};
		}, {});

		return this.filterContentsByName(metadata, inputNames);
	}

	// Parses metadata for the entire form
	parseFormMetadata(form) {
		if (!form.attributes || !form.attributes.length) return {};
		const attributes = Array.from(form.attributes);
		let attributeNames = [];
		const formMetadata = attributes.reduce((acc, attribute) => {
			attributeNames.push(attribute.name);
			const data = {
				[attribute.nodeName]: attribute.nodeValue,
			};
			return {
				...acc,
				...data,
			};
		}, {});

		return this.filterContentsByName(formMetadata, attributeNames);
	}

	// Utility function to generate metadata for a single input
	singleInputMetadata(input, form) {
		if (input) {
			const metadata = FormField.attributes
				.map((attr) => {
					if (attr == "label") {
						return {
							label: new FormField(input, form).possibleLabelName,
						};
					} else {
						const attribute = input.attributes[attr];
						if (
							attribute &&
							attribute.nodeValue &&
							attribute.nodeValue.length
						) {
							return {
								[attribute.nodeName]: attribute.nodeValue,
							};
						}
					}
				})
				.reduce(
					(acc, data) => ({
						...acc,
						...data,
					}),
					{}
				);

			if (input.nodeName.toLowerCase() === "select") {
				metadata.type = "select-one";
				if (input.multiple) {
					metadata.type = "select-multiple";
				}
			}

			return input.name
				? {
					[input.name]:
						Object.keys(metadata).length > 0
							? {
								...metadata,
							}
							: {},
				}
				: undefined;
		}
	}

	// Retrieves all input elements from the form, excluding hidden types
	formInputs(form) {
		const visibleInputs = form.querySelectorAll(
			FormField.elements
				.map((type) => `${type}:not([type="hidden"])`)
				.join(", ")
		);
		const hiddenInputs = form.querySelectorAll(
			FormField.elements.map((type) => `${type}[type="hidden"]`).join(", ")
		);
		return [...Array.from(visibleInputs), ...Array.from(hiddenInputs)];
	}

	// Filters content by name, including only specified names
	filterContentsByName(contents, names) {
		const filtered = {};
		for (const name in contents) {
			if (contents[name] && names.includes(name)) {
				filtered[name] = contents[name];
			}
		}
		return filtered;
	}
}

class Tag {
	static parentExcluded = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];
	static timeTags = ["time"];
	static headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
	static paragraphTags = ["p", "prev", "span"];
	static contentTags = ["li", "div", "span", "a", "button", "label", "td"];

	static divideTags = ["hr", "br", "code"];
	static noStyleTags = ["a", "span", "svg"];
	static markupTags = [
		"strong",
		"b",
		"i",
		"em",
		"mark",
		"small",
		"del",
		"ins",
		"sub",
		"sup",
	];

	static closetAttributesForNavigation = [
		"nav",
		"navigation",
		"header",
		"menu-main",
	];
	static closetAttributeForFooter = ["footer", "footer", "siteFooter"];
	static closetTagsForFooter = ["footer"];
	static closetTagsForNavigation = ["nav", "header"];
	static closetTagsParagraph = ["a", "span"];
	static closetClassBreadcrumb = [
		".Breadcrumb",
		".breadcrumb",
		".Breadcrumbs",
		".breadcrumbs",
		"[class*=breadcrumb]",
		"[class*=breadcrumbs]",
	];

	static excludedIframeDomains = [
		"google.com",
		"facebook.com",
		"doubleclick.com",
		"addtoany.com",
		"doubleclick.net",
		"adsrvr.org",
		"youtube.com",
	];
	static excludedKeyTags = [
		"script",
		"link",
		"style",
		"svg",
		"noscript",
		"meta",
		"body",
		"html",
		"circle",
		"path",
		"line",
		"img",
		"g",
		"rect",
		"title",
		"defs",
		"clippath",
		"access-widget-ui",
	];
	static excludedToolIds = [
		"CybotCookiebotDialog",
		"CookiebotWidget",
		"usercentrics-cmp-ui",
		"onetrust-consent-sdk",
		"consent_blackbar",
		"truste-consent-track",
		"ppms_cm_popup_overlay",
		"didomi-host",
		"cookiescript_injected_wrapper",
		"cookiescript_injected",
		"cookie-information-template-wrapper",
		"coiOverlay",
		"Coi-Renew",
		"iubenda-cs-banner",
		"ccc",
		"ccc-notify",
		"ccc-overlay",
		"ccc-icon",
		"termly-code-snippet-support",
		"INDWrap",
		"uw-widget-custom-trigger",
		"fc_widget",
		"fc_frame",
		"chat-widget-container",
		"chat-widget",
		"chat-widget-minimized",
		"web-messenger-container",
		"hs-eu-cookie-confirmation",
		"ymPluginDivContainerInitial",
		"ymDivBar",
		"intercom-container",
		"site-concierge-iframe",
		"drift-frame-chat",
		"hubspot-messages-iframe-container",
		"bewebchat",
		"bf-revz-widget-4245854698",
		"window-iframe",
		"zsiq_float",
		"siqcht",
		"i-embedded-form",
		"map",
	];
	static excludedToolClass = [
		"CybotCookiebotDialogActive",
		"cmp-wrapper",
		"osano-cm-dialog",
		"osano-cm-window",
		"cky-consent-container",
		"cky-consent-bar",
		"ch2-container",
		"ch2",
		"ch2-region-g0",
		"ppms_cm_popup_overlay",
		"cc-window",
		"cc-banner",
		"cc-type-opt-out",
		"t-consentPrompt",
		"altamira-gdpr-cookie-consent",
		"uwy",
		"userway_p3",
		"utb",
		"uon",
		"fhmtY",
		"intercom-lightweight-app-launcher",
		"intercom-launcher",
		"intercom-namespace",
		"intercom-messenger-frame",
		"intercom-app",
		"cookies-section",
		"chatbot-bubble",
		"chatbot-window",
		"site-concierge",
		"drift-frame-chat",
		"zsiq_floatmain",
		"zsiq_theme1",
		"siq_bR",
		"zls-sptwndw",
		"zsiq-newtheme",
		"Medovnicky",
		"urlslab-skip-all",
	];

	static excludedTagNames = ["access-widget-ui"];

	constructor(tag) {
		this.tag = tag;
	}

	get hasOnlyTextContent() {
		let directTextContent = "";

		// Iterate over the child nodes of the <p> element
		Array.from(this.tag.childNodes).forEach((child) => {
			// Check if the child node is a text node
			if (child.nodeType === 3) {
				directTextContent += child.nodeValue;
			}
		});
		// Check if there's text content without considering child elements.
		const hasTextContent = directTextContent.trim().length > 0;

		if (!hasTextContent) {
			const hasText = this.tag.textContent.trim().length > 0;
			// console.log('this.tag.tagName.toLowerCase()', this.tag.tagName.toLowerCase())
			if (
				hasText &&
				(Tag.timeTags.includes(this.tag.tagName.toLowerCase()) ||
					Tag.paragraphTags.includes(this.tag.tagName.toLowerCase()) ||
					Tag.headingTags.includes(this.tag.tagName.toLowerCase()))
			) {
				// Filter child elements
				const nonBrChildren = Array.from(this.tag.children).filter(
					(child) =>
						![
							...Tag.divideTags,
							...Tag.markupTags,
							...Tag.noStyleTags,
						].includes(child.tagName.toLowerCase())
				);

				// Determine if there are no children other than possibly <br> tags.
				const hasNoNonBrChildElements = nonBrChildren.length === 0;
				return hasNoNonBrChildElements;
			}

			// check below form, if current tag have content text and script tags
			// else if (Tag.paragraphTags.includes(this.tag.tagName.toLowerCase()) || Tag.contentTags.includes(this.tag.tagName.toLowerCase())){
			//      const selector = Tag.paragraphTags.join(',');
			//      const childrenTag = this.tag.querySelector(selector);
			//      if (childrenTag) {

			//           const anchor = childrenTag.querySelector('a');
			//           const script = childrenTag.querySelector('script');

			//           if(childrenTag.textContent.trim() && anchor && anchor.textContent.trim() && script){

			//                let insideChildText = childrenTag.childNodes[0].textContent.trim();
			//                let insideChildAText = anchor.textContent.trim();
			//                const resultText = insideChildText +' '+ insideChildAText;
			//                console.log('result', resultText);
			//                return resultText;
			//           }
			//      }

			// }

			return false;
		}

		// Filter child elements
		const nonBrChildren = Array.from(this.tag.children).filter(
			(child) =>
				![...Tag.divideTags, ...Tag.markupTags, ...Tag.noStyleTags].includes(
					child.tagName.toLowerCase()
				)
		);

		// Determine if there are no children other than possibly <br> tags.
		const hasNoNonBrChildElements = nonBrChildren.length === 0;
		return hasNoNonBrChildElements && hasTextContent;
	}

	get isIframe() {
		return this.tag.tagName.toLowerCase() === "iframe";
	}

	get isForm() {
		return this.tag.tagName.toLowerCase() === "form";
	}

	get isContentTag() {
		const elementTag = this.tag.tagName.toLowerCase();
		const parentElement = this.tag.parentElement;
		const aChildTag = this.tag.querySelector("a");
		const parentTagName = parentElement?.tagName.toLowerCase();
		const parentNode = this.tag.parentNode;
		// Exclude breadcrumb child tags
		if (
			this.tag.closest(
				[...Tag.closetClassBreadcrumb.map((item) => item)].join(", ")
			)
		) {
			return false;
		}

		// keep 1 span tag in span>span>a
		if (
			Tag.closetTagsParagraph.includes(elementTag) &&
			Tag.closetTagsParagraph.includes(parentTagName)
		) {
			if (aChildTag) {
				return false;
			}
			if (this.tag.textContent.trim().length > 0) {
				return false;
			}
		}

		// Exclude a tag from li tag
		if (
			elementTag == "a" &&
			parentTagName == "li" &&
			parentNode.childNodes.length > 0
		) {
			const siblings = Array.from(parentNode.childNodes);
			if (siblings.some((node) => node.nodeName.toLowerCase() === "br"))
				return false;
		}

		// Is child tag of the form
		if (this.tag.closest("form")) {
			const formChildren = this.tag.closest("form").querySelectorAll("*");
			const listTagsAbove = [];
			for (let i = formChildren.length - 1; i >= 0; i--) {
				const child = formChildren[i];
				if (
					child.tagName.toLowerCase() === "input" &&
					child.getAttribute("type") !== "hidden"
				)
					break;
				listTagsAbove.push(child);
			}
			if (!listTagsAbove.includes(this.tag)) return false;

			if (elementTag === "label") {
				const labelClasses = ["gfield_label"];
				if (labelClasses.some((l) => this.tag.className.includes(l)))
					return false;

				const labelFor = this.tag.getAttribute("for");

				if (labelFor && document.getElementById(labelFor)) return false;
			} else {
				if (this.tag.closest("label") || elementTag === "button") {
					return false;
				}
			}

			if (elementTag === "span") {
				const childLabel = this.tag.querySelector("label");
				if (childLabel) {
					const labelFor = childLabel.getAttribute("for");

					if (labelFor && document.getElementById(labelFor)) return false;
				}
			}
		}

		return (
			[
				...Tag.headingTags,
				...Tag.timeTags,
				...Tag.paragraphTags,
				...Tag.contentTags,
			].includes(elementTag) && this.hasOnlyTextContent
		);
	}

	get isContent() {
		return (
			(this.isContentTag || this.isForm) &&
			!this.isBelongToNavigation &&
			!this.isBelongToFooter
		);
	}

	get isNavigation() {
		const elementTag = this.tag.tagName.toLowerCase();

		if (
			this.tag.closest(
				[
					...Tag.closetTagsForFooter,
					...Tag.closetAttributeForFooter.map((item) => "#" + item),
					...Tag.closetAttributeForFooter.map((item) => "." + item),
				].join(", ")
			)
		) {
			return false;
		}

		if (this.tag.closest("#ll-fake-iframe-crawl")) return false;

		if (Tag.closetTagsForNavigation.includes(elementTag)) {
			return true;
		}

		return false;
	}

	get isBelongToNavigation() {
		if (!this.isContentTag && !this.isForm) {
			return false;
		}
		const closestElement = this.tag.closest(
			[
				...Tag.closetTagsForNavigation,
				...Tag.closetAttributesForNavigation.map((item) => "#" + item),
				...Tag.closetAttributesForNavigation.map((item) => "." + item),
			].join(", ")
		);

		if (closestElement) {
			if (
				this.tag.closest(
					[
						...Tag.closetTagsForFooter,
						...Tag.closetAttributeForFooter.map((item) => "#" + item),
						...Tag.closetAttributeForFooter.map((item) => "." + item),
					].join(", ")
				)
			) {
				return false;
			}

			if (closestElement.tagName.toLowerCase() === "p") return false;
			return true;
		}
	}

	get isFooter() {
		const elementTag = this.tag.tagName.toLowerCase();
		if (Tag.closetTagsForFooter.includes(elementTag)) {
			return true;
		}

		if (this.tag.closest("#ll-fake-iframe-crawl")) return false;

		return false;
	}

	get isBelongToFooter() {
		if (!this.isContentTag && !this.isForm) {
			return false;
		}
		if (
			this.tag.closest(
				[
					...Tag.closetTagsForFooter,
					...Tag.closetAttributeForFooter.map((item) => "#" + item),
					...Tag.closetAttributeForFooter.map((item) => "." + item),
				].join(", ")
			)
		) {
			return true;
		}
	}

	get isExclude() {
		const elementTag = this.tag.tagName.toLowerCase();
		return Tag.excludedKeyTags.includes(elementTag);
	}

	get shouldCheck() {
		if (this.isExclude) {
			return false;
		}

		if (
			[...Tag.divideTags, ...Tag.markupTags, ...Tag.noStyleTags].includes(
				this.tag.tagName.toLowerCase()
			) &&
			this.tag.closest([Tag.parentExcluded].join(", "))
		) {
			return false;
		}
		// Skip excluded tags related to tool
		if (
			this.tag.closest("#" + Tag.excludedToolIds.join(", #")) ||
			this.tag.closest("." + Tag.excludedToolClass.join(", .")) ||
			Tag.excludedTagNames.includes(this.tag.tagName.toLowerCase())
		) {
			return false;
		}

		if (this.isIframe) {
			if (
				!this.tag.src ||
				this.tag.src == "" ||
				this.tag.src == "about:blank" ||
				this.tag.src == "javascript:void(0)"
			) {
				return false;
			}
			const hostname = new URL(this.tag.src).hostname;
			if (
				Tag.excludedIframeDomains.some((domain) => hostname.includes(domain))
			) {
				return false; // Skip excluded tags
			}
		}

		return (
			this.isContent ||
			this.isBelongToNavigation ||
			this.isIframe ||
			this.isForm ||
			this.isBelongToFooter ||
			this.isNavigation ||
			this.isFooter
		);
	}

	get getAllAttributesAsObject() {
		let attributesObject = {};
		for (let attr of this.tag.attributes) {
			attributesObject[attr.name] = attr.value;
		}
		return attributesObject;
	}

	get assignmentFormId() {
		const data = {
			location: window.location.href,
		};
		data.formId = this.tag.id || "unknown";
		data.formClass = this.tag.className || "";
		return md5(JSON.stringify(data));
	}

	get hash() {
		const data = {
			tag: this.tag.tagName.toLowerCase() || "",
		};
		data.id = this.tag.id || "";
		data.class = this.tag.className || "";
		return md5(JSON.stringify(data));
	}

	get getDataIdContent() {
		const tabsSelect = this.tag.closest(".tabs-select");
		let dataId = null;
		try {
			if (tabsSelect) {
				dataId = this.tag.getAttribute("data-id");
			}
		} catch (error) { }
		return dataId;
	}

	get getDataIdForm() {
		const tabsContent = this.tag.closest(".tabs-content");

		let dataId = {};

		try {
			if (tabsContent) {
				let currentElement = this.tag.parentElement;

				while (currentElement) {
					if (currentElement.classList.contains("tabs-content") && dataId) {
						break;
					}

					if (currentElement.hasAttribute("data-id")) {
						dataId = {
							"data-id": currentElement.getAttribute("data-id"),
						};
					}
					currentElement = currentElement.parentElement;
				}
			}
		} catch (error) { }
		return dataId;
	}

	get formData() {
		const formParser = new FormParser();
		// const formData = formParser.parseFormContent(this.tag) || {};
		const formMetadata = formParser.parseFormMetadata(this.tag) || {};
		// const inputMetadata = formParser.parseInputMetadata(this.tag) || {};

		const pageFormClass = formMetadata.class || "";
		const formAction = formMetadata.action;
		const dataFormId = formMetadata["data-form-id"];
		const pageFormId =
			getFormId(
				this.tag.getAttribute("id"),
				pageFormClass,
				formAction,
				dataFormId
			) || "";

		const dataId = this.getDataIdForm;

		return {
			formID: pageFormId,
			...formMetadata,
			...dataId,
		};
	}

	get isAboveForm() {
		const formTag = this.tag.closest("form");
		if (!formTag) return false;

		const formChildren = formTag.querySelectorAll("*");
		const elementsFields = ["input", "select", "textarea", "button"];
		let firstInputIndex = 0;
		let tagIndex = 0;

		for (let index = 0; index < formChildren.length; index++) {
			const child = formChildren[index];
			const closetChildHidden = ["gfield_visibility_hidden"];
			const closestChild = child.closest(
				[
					...closetChildHidden.map((item) => "#" + item),
					...closetChildHidden.map((item) => "." + item),
				].join(", ")
			);
			if (
				elementsFields.includes(child.tagName.toLowerCase()) &&
				!closestChild
			) {
				firstInputIndex = index;
				break;
			}
		}

		for (let index = 0; index < formChildren.length; index++) {
			const child = formChildren[index];
			if (child === this.tag) {
				tagIndex = index;
				break;
			}
		}

		if (tagIndex <= firstInputIndex) return true;
		return false;
	}

	get object() {
		function getTextContentExcludingSVG(node) {
			let textContent = "";

			// Function to recursively get text, but ignore <svg> elements and their children
			function collectText(node) {
				// If the node is an <svg>, skip it and all its descendants
				if (node.nodeType === 1 && node.tagName.toLowerCase() === "svg") {
					return;
				}

				// If the node is a text node, add its content
				if (node.nodeType === 3) {
					textContent += node.nodeValue;
				}

				// Otherwise, if the node has child nodes, recursively check them (except if it's <svg>)
				else if (node.childNodes.length) {
					Array.from(node.childNodes).forEach(collectText);
				}
			}

			// Start the recursive collection from the provided node
			collectText(node);

			return textContent.trim();
		}

		if (this.isBelongToNavigation) {
			const navigator = this.tag.closest(
				[...Tag.closetTagsForNavigation].join(", ")
			);
			if (this.isForm) {
				return {
					item: this.tag.tagName.toLowerCase(),
					classes: this.tag.className,
					content: this.formData,
					navigator: new Tag(navigator).hash,
				};
			} else {
				const tagData = {
					item: this.tag.tagName.toLowerCase(),
					classes: this.tag.className,
					content: removeNewlinesAndTabs(
						getTextContentExcludingSVG(this.tag).trim()
					),
					navigator: new Tag(navigator).hash,
				};

				if (this.isAboveForm) {
					tagData.isAboveForm = true;
				}
				return { ...tagData };
			}
		}

		if (this.isBelongToFooter) {
			const footer = this.tag.closest(
				[
					...Tag.closetTagsForFooter,
					...Tag.closetAttributeForFooter.map((item) => "#" + item),
					...Tag.closetAttributeForFooter.map((item) => "." + item),
				].join(", ")
			);
			if (this.tag.tagName.toLowerCase() === "a") {
				return {
					item: this.tag.tagName.toLowerCase(),
					content: removeNewlinesAndTabs(
						getTextContentExcludingSVG(this.tag).trim()
					),
					footer: {
						tag: footer.tagName.toLowerCase(),
						id: footer.id,
						classes: footer.className,
					},
					href: this.tag.href,
				};
			} else {
				if (this.isForm) {
					return {
						item: this.tag.tagName.toLowerCase(),
						content: this.formData,
						footer: new Tag(footer).hash,
					};
				} else {
					const tagData = {
						item: this.tag.tagName.toLowerCase(),
						content: removeNewlinesAndTabs(
							getTextContentExcludingSVG(this.tag).trim()
						),
						footer: new Tag(footer).hash,
					};
					if (this.isAboveForm) {
						tagData.isAboveForm = true;
					}
					return { ...tagData };
				}
			}
		}
		if (
			this.isContent &&
			!this.isBelongToNavigation &&
			!this.isBelongToFooter
		) {
			if (this.tag.tagName.toLowerCase() === "a") {
				const tagData = {
					item: this.tag.tagName.toLowerCase(),
					content: removeNewlinesAndTabs(
						getTextContentExcludingSVG(this.tag).trim()
					),
					href: this.tag.href,
				};
				if (this.isAboveForm) {
					tagData.isAboveForm = true;
				}
				if (this.getDataIdContent) {
					tagData["data-id"] = this.getDataIdContent;
				}
				return tagData;
			} else {
				if (this.isForm) {
					return {
						item: this.tag.tagName.toLowerCase(),
						content: this.formData,
					};
				} else {
					const tagData = {
						item: this.tag.tagName.toLowerCase(),
						content: removeNewlinesAndTabs(
							getTextContentExcludingSVG(this.tag).trim()
						),
					};
					if (this.isAboveForm) {
						tagData.isAboveForm = true;
					}
					if (this.getDataIdContent) {
						tagData["data-id"] = this.getDataIdContent;
					}
					return tagData;
				}
			}
		}

		if (this.isForm) {
			return {
				item: this.tag.tagName.toLowerCase(),
				content: this.formData,
			};
		}

		if (this.isIframe) {
			return {
				item: this.tag.tagName.toLowerCase(),
				content: this.getAllAttributesAsObject,
			};
		}

		if (this.isNavigation) {
			return {
				item: "navigation",
				attributes: this.getAllAttributesAsObject,
				hash: this.hash,
				contents: [],
			};
		}

		if (this.isFooter) {
			return {
				item: this.tag.tagName.toLowerCase(),
				attributes: this.getAllAttributesAsObject,
				hash: this.hash,
				contents: [],
			};
		}
	}
}

class Header {
	constructor(doc) {
		this.doc = doc;
	}

	get title() {
		return this.doc.querySelector("title")
			? this.doc.querySelector("title").innerText
			: "";
	}

	get metDescription() {
		return this.doc.querySelector('meta[name="description"]')
			? this.doc
				.querySelector('meta[name="description"]')
				.getAttribute("content")
			: "";
	}

	get pageLanguage() {
		return this.doc.documentElement?.lang;
	}

	get canonicalUrl() {
		return this.doc.querySelector('link[rel="canonical"]')
			? this.doc.querySelector('link[rel="canonical"]').getAttribute("href")
			: "";
	}

	process() {
		return {
			title: this.title,
			metDescription: this.metDescription,
			pageLanguage: this.pageLanguage,
			canonicalUrl: this.canonicalUrl,
		};
	}
}

class Breadcrumb {
	constructor(doc) {
		this.doc = doc;
		this.listDom;
	}

	get breadCum() {
		let breadcrumbs = [];
		try {
			switch (true) {
				//options 1
				case this.hasSchemaBreadcrumbs():
					breadcrumbs = this.extractBreadcrumb(Array.from(this.listDom));
					break;

				// options 2
				case this.hasScriptsBreadcrumbs():
					breadcrumbs = this.extractJSONBreadcrumbs(Array.from(this.listDom));
					break;

				// options 3 RDFa
				case this.hasRDFaBreadcrumbs():
					breadcrumbs = this.extractRDFaBreadcrumbs(Array.from(this.listDom));
					break;

				// options 4 Nav
				case this.hasNavBreadCrumbs():
					breadcrumbs = this.extractBreadcrumb(Array.from(this.listDom));
					break;

				//options 5 Aria-label
				case this.hasAriaBreadcrumbs():
					breadcrumbs = this.extractBreadcrumb(Array.from(this.listDom));
					break;

				case this.hasWooBreadcrumbs():
					breadcrumbs = this.extractWooBreadcrumb();
					break;

				//option 6 className
				case this.hasClassNameBreadCrumbs():
					breadcrumbs = this.extractBreadcrumb(Array.from(this.listDom));
					break;

				default:
					breadcrumbs;
					break;
			}
		} catch (error) { }
		return breadcrumbs;
	}

	process() {
		return this.breadCum;
	}

	getNameEmptyTag(breadcrumbString) {
		const textWithoutTags = breadcrumbString.replace(
			/<a.*?>(.*?)<\/a>|<span.*?>(.*?)<\/span>/gi,
			""
		);

		let breadcrumbs = textWithoutTags.split("/");

		for (var i = 0; i < breadcrumbs.length; i++) {
			breadcrumbs[i] = breadcrumbs[i].trim();
		}

		return breadcrumbs.filter(function (item) {
			return item !== "";
		});
	}

	//check options 1 itemType
	hasSchemaBreadcrumbs() {
		const flagListDom =
			this.doc.querySelectorAll(
				'[itemscope][itemtype="http://schema.org/BreadcrumbList"] li'
			).length > 0;
		if (flagListDom) {
			this.listDom = this.doc.querySelectorAll(
				'[itemscope][itemtype="http://schema.org/BreadcrumbList"] li'
			);
			return true;
		}
		return false;
	}

	//check options 2 scripts
	hasScriptsBreadcrumbs() {
		const flagListDom = this.doc.querySelectorAll(
			'script[type="application/ld+json"]'
		);
		let foundBreadcrumbs = false;
		flagListDom.forEach((script) => {
			const jsonData = JSON.parse(script.textContent);
			if (
				jsonData &&
				jsonData["@type"] === "BreadcrumbList" &&
				Array.isArray(jsonData.itemListElement)
			) {
				this.listDom = this.doc.querySelectorAll(
					'script[type="application/ld+json"]'
				);
				foundBreadcrumbs = true;
				return;
			}
		});
		return foundBreadcrumbs;
	}

	//check options 3 RDFa
	hasRDFaBreadcrumbs() {
		const flagListDom =
			this.doc.querySelectorAll('[typeof="BreadcrumbList"] li').length > 0;
		if (flagListDom) {
			this.listDom = this.doc.querySelectorAll('[typeof="BreadcrumbList"] li');
			return true;
		}
		return false;
	}

	//check options 4 Nav
	hasNavBreadCrumbs() {
		const ariaLabels = [
			"nav.breadcrumbs",
			"nav .breadcrumbs",
			"nav.breadcrumb",
			"nav .breadcrumb",
			"nav.Breadcrumbs",
			"nav .Breadcrumbs",
			"nav.Breadcrumb",
			"nav .Breadcrumb",
		];
		for (let label of ariaLabels) {
			const flagListDom = this.doc.querySelectorAll(`${label} li`).length > 0;

			if (flagListDom) {
				const domClassSelector = this.doc.querySelectorAll(`${label} li`);
				// Remove all span tags and keep only the last span tag
				const listBreadCrumb = Array.from(domClassSelector).filter(
					(item) =>
						item.tagName.toLowerCase() !== "span" ||
						item === domClassSelector[domClassSelector.length - 1]
				);
				this.listDom = listBreadCrumb;
				return true;
			}
		}
		return false;
	}

	//check options 5 Aria-label
	hasAriaBreadcrumbs() {
		const ariaLabels = [
			"breadcrumbs",
			"Breadcrumbs",
			"Breadcrumb",
			"breadcrumb",
		];
		for (let label of ariaLabels) {
			const flagListDom =
				this.doc.querySelectorAll(`nav[aria-label='${label}' i] li`).length > 0;

			if (flagListDom) {
				const domClassSelector = this.doc.querySelectorAll(
					`nav[aria-label='${label}' i] li`
				);
				// Remove all span tags and keep only the last span tag
				const listBreadCrumb = Array.from(domClassSelector).filter(
					(item) =>
						item.tagName.toLowerCase() !== "span" ||
						item === domClassSelector[domClassSelector.length - 1]
				);
				this.listDom = listBreadCrumb;
				return true;
			}
		}
		return false;
	}

	//check option 6 className
	hasClassNameBreadCrumbs() {
		const ariaLabels = [
			".Breadcrumb li",
			".breadcrumb li",
			".Breadcrumbs li",
			".breadcrumbs li",
			".Breadcrumb",
			".breadcrumb",
			".Breadcrumbs",
			".breadcrumbs",
			"[class*=breadcrumb]",
			"[class*=breadcrumbs]",
		];

		const listClassName = [
			".Breadcrumb",
			".breadcrumb",
			".Breadcrumbs",
			".breadcrumbs",
			"[class*=breadcrumb]",
			"[class*=breadcrumbs]",
		];

		for (let label of ariaLabels) {
			const flagListDom = this.doc.querySelectorAll(`${label}`).length > 0;

			if (flagListDom) {
				if (listClassName.includes(label)) {
					const domClassSelector = this.doc.querySelector(`${label}`);
					const breadcrumbString = domClassSelector?.innerHTML
						?.replace(/&nbsp;/g, "")
						.trim();
					const namesBreadcrumb =
						typeof breadcrumbString === "string"
							? this.getNameEmptyTag(breadcrumbString)
							: [];
					const domTagAll = domClassSelector.querySelectorAll("a, span");
					// Remove all span tags and keep only the last span tag
					const listBreadCrumb = Array.from(domTagAll).filter(
						(item, index, array) => {
							if (item.tagName.toLowerCase() === "span") {
								// Check if the content of the span tag contains "/" or not
								const isTextWithSlash =
									item.childNodes.length === 1 &&
									item.childNodes[0].nodeType === Node.TEXT_NODE &&
									item.textContent.trim().includes("/");

								// Check if the content of the span tag contains a "\" sign, '›', or '>'
								const checkIconSpan = ["\\", "›", ">"];
								const containsBackslash = checkIconSpan.some((char) =>
									item.textContent.includes(char)
								);

								// Keep the last two span tags that do not contain "/" and do not contain "\"
								return (
									!isTextWithSlash &&
									!containsBackslash &&
									(index === array.length - 1 || index === array.length - 2)
								);
							} else {
								// Retain non-span elements
								return true;
							}
						}
					);
					if (namesBreadcrumb?.length) {
						listBreadCrumb.push(...namesBreadcrumb);
					}

					this.listDom = listBreadCrumb;
				} else {
					this.listDom = this.doc.querySelectorAll(`${label}`);
				}
				return true;
			}
		}
		return false;
	}

	hasWooBreadcrumbs() {
		const breadcrumbHtml = document.querySelector(".woocommerce-breadcrumb");
		if (breadcrumbHtml) return true;
		return false;
	}

	//option 2
	extractJSONBreadcrumbs(breadcrumbItems) {
		const breadcrumbs = [];
		breadcrumbItems.forEach((script) => {
			try {
				const jsonData = JSON.parse(script.textContent);
				if (
					jsonData &&
					jsonData["@type"] === "BreadcrumbList" &&
					Array.isArray(jsonData.itemListElement)
				) {
					jsonData.itemListElement.forEach((item, index) => {
						const breadcrumb = {
							name: item.item ? item.item.name || "" : item.name || "",
							url: item.item ? item.item["@id"] || "" : "",
						};
						if (index === jsonData.itemListElement.length - 1) {
							breadcrumb.current = true;
						}
						if (index > 0 && index < jsonData.itemListElement.length - 1) {
							breadcrumb.parent = true;
						}
						breadcrumbs.push(breadcrumb);
					});
				}
			} catch (error) {
				console.error(error);
			}
		});
		return breadcrumbs;
	}

	//option 3
	extractRDFaBreadcrumbs(rdfaBreadcrumbs) {
		const breadcrumbs = [];
		rdfaBreadcrumbs.forEach((item, index) => {
			const name = item.querySelector('[property="name"]').innerText.trim();
			const url = item.querySelector("a")?.getAttribute("href") || "";

			const breadcrumb = {
				name: name,
				url: url,
			};

			// Check if the current breadcrumb is a parent based on its index
			if (index > 0 && index < rdfaBreadcrumbs.length - 1) {
				breadcrumb.parent = true;
			}

			// If the breadcrumb case has only 2 levels then the first position will be the parent
			if (index === 0 && rdfaBreadcrumbs.length === 2) {
				breadcrumb.parent = true;
			}

			// Show current only for the current breadcrumb
			const isCurrent = index === rdfaBreadcrumbs.length - 1;
			if (isCurrent) {
				breadcrumb.current = true;
			}

			breadcrumbs.push(breadcrumb);
		});
		return breadcrumbs;
	}

	//option 1-4-5-6
	extractBreadcrumb(breadcrumbItems) {
		const breadcrumbs = [];

		breadcrumbItems = Array.from(breadcrumbItems).filter(
			(item, index, array) => {
				if (typeof item === "string") return true;

				if (item.tagName.toLowerCase() === "li") {
					// Check if the content of the span tag contains "/" or not
					const isTextWithSlash =
						item.childNodes.length === 1 &&
						item.childNodes[0].nodeType === Node.TEXT_NODE &&
						item.textContent.trim().includes("/");

					// Keep the last two span tags that do not contain "/"
					return !isTextWithSlash;
				} else {
					// Retain non-span elements
					return true;
				}
			}
		);

		breadcrumbItems.forEach((item, index) => {
			const isStringItem = typeof item === "string";
			const link = isStringItem ? null : item.querySelector("a");

			const processName = (innerTextName) => {
				let updateName;
				if (index === 0) {
					if (innerTextName !== "") {
						updateName = innerTextName;
						return updateName;
					} else {
						updateName = "Home";
						return updateName;
					}
				} else {
					updateName = innerTextName.replace(/\//g, "");
					return updateName;
				}
			};

			const updateNameUrl = link
				? processName(link.innerText.trim())
				: processName(item?.innerText?.trim() || item);

			const processUrl = (url) => {
				if (url) {
					if (!url.includes("http")) {
						return window.location.origin + url;
					} else {
						return url;
					}
				} else {
					return "";
				}
			};

			const newUrl = !isStringItem
				? processUrl(item?.getAttribute("href"))
				: "";
			const newUrlLink = !isStringItem
				? processUrl(link?.getAttribute("href"))
				: false;

			const urlPage = !isStringItem
				? item.tagName.toLowerCase() === "a"
					? newUrl
					: ""
				: "";
			const breadcrumb = {
				name: updateNameUrl,
				url: link ? newUrlLink : urlPage,
			};

			// Check if the current breadcrumb is a parent based on its index
			if (index > 0 && index < breadcrumbItems.length - 1) {
				breadcrumb.parent = true;
			}

			// If the breadcrumb case has only 2 levels then the first position will be the parent
			if (index === 0 && breadcrumbItems.length === 2) {
				breadcrumb.parent = true;
			}

			// Show current only for the current breadcrumb
			const isCurrent = index === breadcrumbItems.length - 1;
			if (
				isStringItem ||
				(item.classList.contains("active") &&
					item.getAttribute("aria-current") === "page") ||
				isCurrent
			) {
				breadcrumb.url = breadcrumb.url || window.location.href;
				breadcrumb.current = true;
			}

			breadcrumbs.push(breadcrumb);
		});

		return breadcrumbs;
	}

	extractWooBreadcrumb() {
		const breadcrumbHtml = document.querySelector(
			".woocommerce-breadcrumb"
		).innerHTML;

		const breadcrumbParts = breadcrumbHtml.split("&nbsp;/&nbsp;");

		const breadcrumbArray = [];

		breadcrumbParts.forEach((part, index) => {
			if (part.includes("<a")) {
				const tempElement = document.createElement("div");
				tempElement.innerHTML = part;
				const anchor = tempElement.querySelector("a");

				const breadcrumbItem = {
					name: anchor.textContent,
					url: anchor.href,
					parent: index === 0 ? false : true,
				};
				breadcrumbArray.push(breadcrumbItem);
			} else {
				const tempElement = document.createElement("div");
				tempElement.innerHTML = part;
				const anchor = tempElement.querySelector("a");

				const breadcrumbItem = {
					name: part,
					url: anchor ? anchor.href : null,
				};

				if (index !== 0) {
					breadcrumbItem.parent = true;
					breadcrumbItem.current = true;
				}

				breadcrumbArray.push(breadcrumbItem);
			}
		});

		return breadcrumbArray;
	}
}

class Page {
	constructor(header, breadcrumb) {
		this.url = window.location.href;
		this.header = header.process();
		this.breadcrumb = breadcrumb.process();
		this.navigation = [];
		this.content = [];
		this.footer = [];
		this.process();
	}

	process() {
		const tags = document.querySelectorAll("*");
		Array.from(tags).map((tag) => {
			const object = new Tag(tag);
			if (object.shouldCheck) {
				if (object.isBelongToNavigation && object.isForm) {
					if (object.isForm) {
						if (object.object.content["id"] || object.object.content["class"])
							this.navigation.push(object.object);
					}
					// this.navigation.push(object.object);
				}
				if (object.isBelongToFooter) {
					if (object.isForm) {
						if (object.object.content["id"] || object.object.content["class"])
							this.footer.push(object.object);
					} else {
						if (Tag.headingTags.includes(tag.tagName.toLowerCase())) {
							this.footer.push(object.object);
						}
					}
				}

				if (
					(object.isContent &&
						!object.isBelongToNavigation &&
						!object.isBelongToFooter) ||
					object.isIframe ||
					object.isNavigation ||
					object.isFooter
				) {
					if (object.isForm) {
						if (object.object.content["id"] || object.object.content["class"])
							this.content.push(object.object);
					} else {
						this.content.push(object.object);
					}
				}
			}
		}, {});

		if (this.footer.length > 0) {
			this.footer.map((item) => {
				if (item.footer) {
					const index = this.content.findIndex(
						(element) => element.hash === item.footer
					);
					if (index > 0) {
						this.content[index].contents.push(item);
					}
				}
			});
		}

		if (this.navigation.length > 0) {
			this.navigation.map((item) => {
				if (item.navigator) {
					const index = this.content.findIndex(
						(element) => element.hash === item.navigator
					);
					if (index > 0) {
						this.content[index].contents.push(item);
					}
				}
			});
		}
	}

	getJson() {
		const contents = [...this.content].filter(
			(item) =>
				typeof item.content !== "string" ||
				(item.content.length > 2 && item.content.toLowerCase() !== "hidden")
		);
		const tagHeading = ["h1", "h2", "h3", "h4", "h5", "h6"];
		const tagNotHandle = ["form", "footer", "navigation", "iframe"];

		const splitArray = (arr, index, formHeader) => {
			const LENGTH_ABOVE_FORM = formHeader?.length ? 4 : 8;
			const LENGTH_BELOW_FORM = 5;

			if (index < 0 || index >= arr.length) {
				throw new Error("Index out of bounds");
			}

			let startIdx = Math.max(0, index - LENGTH_ABOVE_FORM);
			let beforeIndex = arr.slice(startIdx, index);

			if (beforeIndex.length) {
				const dataIds = beforeIndex.filter((i) => i["data-id"]);
				const dataIdsLength = dataIds.length;
				if (dataIdsLength) {
					const maxIndex = LENGTH_ABOVE_FORM + dataIdsLength - 1;
					startIdx = Math.max(0, index - maxIndex);
					beforeIndex = arr.slice(startIdx, index);
				}
			}

			let endIdx = Math.min(arr.length, index + LENGTH_BELOW_FORM);
			let afterIndex = arr.slice(index + 1, endIdx);

			if (afterIndex.length) {
				const dataIds = afterIndex.filter((i) => i["data-id"]);
				const dataIdsLength = dataIds.length;
				if (dataIdsLength) {
					const minIndex = LENGTH_BELOW_FORM + dataIdsLength - 1;
					endIdx = Math.min(arr.length, index + minIndex);
					afterIndex = arr.slice(index + 1, endIdx);
				}
			}

			return { beforeIndex, afterIndex };
		};

		const getAdjacentItems = (arr, index, formHeader) => {
			const beforeItems = [];
			const afterItems = [];

			const itemForm = arr[index];
			const { beforeIndex, afterIndex } = splitArray(arr, index, formHeader);
			let countItemBefore = 0;
			for (let i = beforeIndex.length - 1; i >= 0; i--) {
				const beforeItem = beforeIndex[i];
				countItemBefore++;
				if (
					(beforeItem.item === "form" && beforeItems.length) ||
					beforeItem.item === "footer" ||
					(!formHeader?.length &&
						tagHeading.includes(beforeItems[0]?.item) &&
						countItemBefore > 4)
				)
					break;
				const skipItems = ["navigation", "iframe", "form"];
				if (!skipItems.includes(beforeItem.item) && !beforeItem.isAboveForm) {
					const dataId = itemForm.content && itemForm.content["data-id"];
					if (!beforeItem["data-id"] || dataId === beforeItem["data-id"]) {
						beforeItems.unshift(beforeItem);
					}
				}
			}

			for (let i = 0; i < afterIndex.length; i++) {
				const afterItem = afterIndex[i];
				if (
					(afterItem.item === "form" && afterItems.length) ||
					afterItem.item === "footer"
				)
					break;
				const skipItems = ["navigation", "iframe", "form"];
				if (!skipItems.includes(afterItem.item) && !afterItem.isAboveForm) {
					const dataId = itemForm.content && itemForm.content["data-id"];
					if (!afterItem["data-id"] || dataId === afterItem["data-id"]) {
						afterItems.push(afterItem);
					}
				}
			}

			return { aboveForm: beforeItems, belowForm: afterItems };
		};

		const classNamesOrIds = [
			"add-to-cart",
			"addtocart",
			"addcart",
			"cart-add",
			"cartadd",
			"comment",
			"comments",
			"review",
			"reviews",
			"search",
			"forgotpassword",
			"forgot-password",
			"password-forgot",
			"passwordforgot",
		];

		for (let index = 0; index < contents.length; index++) {
			const content = contents[index];
			if (content.isAboveForm) {
				const itemForm = { ...contents[index - 1] };

				if (!itemForm.formHeader) {
					const newHeader = { ...content };
					if (tagHeading.includes(content.item)) {
						newHeader.heading = true;
					}
					itemForm.formHeader = [newHeader];
				} else {
					itemForm.formHeader.unshift(content);
				}
				contents[index] = { ...itemForm };
				contents[index - 1] = { ...content };
			}

			if (content.item === "footer" || content.item === "navigation") {
				const fContents = content.contents;
				for (let i = 0; i < fContents.length; i++) {
					const fContent = fContents[i];
					if (fContent.isAboveForm) {
						const itemForm = { ...fContents[i - 1] };

						if (!itemForm.formHeader) {
							const newHeader = { ...fContent };
							if (tagHeading.includes(fContent.item)) {
								newHeader.heading = true;
							}
							itemForm.formHeader = [newHeader];
						} else {
							itemForm.formHeader.unshift(fContent);
						}
						content.contents[i] = { ...itemForm };
						content.contents[i - 1] = { ...fContent };
					}
				}
			}
		}

		for (let index = 0; index < contents.length; index++) {
			const content = contents[index];
			if (content.item === "form") {
				if (content.formHeader?.length) {
					const isHasHeading = content.formHeader.some((h) => h.heading);
					if (!isHasHeading) {
						let count = 0;
						for (let i = index - 1; i >= 0; i--) {
							const element = contents[i];
							const isHeading = tagHeading.includes(element.item);
							const isLabel = content.formHeader.some(
								(h) => h.item === "label"
							);
							if (element.isAboveForm) continue;
							if (
								(!element.isAboveForm && !isHeading && !isLabel) ||
								element.item === "footer" ||
								element.item === "form" ||
								count === 2
							)
								break;
							if (isHeading) {
								contents[index].formHeader.unshift({
									...element,
									heading: true,
								});
								contents[i].isAboveForm = true;
								break;
							} else {
								contents[index].formHeader.unshift({
									...element,
									isAboveForm: true,
								});
								contents[i].isAboveForm = true;
							}
							count++;
						}
						const isHeadingAfter = content.formHeader.some((h) => h.heading);
						if (!isHeadingAfter) {
							delete content.formHeader;
							count = 0;
							for (let i = index - 1; i >= 0; i--) {
								if (count === 3) break;
								delete contents[i].isAboveForm;
								count++;
							}
						}
					}
				} else {
					const formHeader = [];
					let countLoop = 0;
					for (let i = index - 1; i >= 0; i--) {
						const element = contents[i];
						if (
							countLoop >= 3 ||
							element.item === "form" ||
							element.item === "footer"
						)
							break;
						if (tagNotHandle.includes(element.item)) continue;
						if (tagHeading.includes(element.item) && !element.isAboveForm) {
							formHeader.unshift({ ...element, heading: true });
							contents[index].formHeader = formHeader;
							contents[i].isAboveForm = true;
							break;
						}

						const isBeforeHeading =
							(tagHeading.includes(contents[i - 1]?.item || "") &&
								i - 1 >= index - 3) ||
							(tagHeading.includes(contents[i - 2]?.item || "") &&
								i - 2 >= index - 3);

						if (
							!tagNotHandle.includes(element.item) &&
							!element.isAboveForm &&
							isBeforeHeading
						) {
							formHeader.unshift(element);
							contents[index].formHeader = formHeader;
							contents[i].isAboveForm = true;
						}
						countLoop++;
					}
				}
			}
		}

		for (let index = 0; index < contents.length; index++) {
			const content = contents[index];
			const { item } = content;
			let form = content.content || {};
			let formHeader = content.formHeader || [];
			let everyForms = false;

			const classNamesOrIdsIgnore = classNamesOrIds.some(
				(item) =>
					form.formID?.toString().toLowerCase().includes(item) ||
					form.class?.toString().toLowerCase().includes(item)
			);
			const searchIgnoreByAction = form.action?.toLowerCase() === "/search";
			const excludeClassNamesOrIds =
				classNamesOrIdsIgnore || searchIgnoreByAction;

			if (item === "footer" || item === "navigation") {
				everyForms = content.contents.every((v) => v.item === "form");
				const hasForm = content.contents.some((v) => v.item === "form");
				if (!everyForms && hasForm) {
					let textForm = {
						aboveForm: [],
						formHeading: [],
						formSubHeading: [],
						belowForm: [],
					};
					const footerContents = [...content.contents];
					for (let i = 0; i < footerContents.length; i++) {
						const footerContent = footerContents[i];
						if (footerContent.item === "form") {
							const fFormHeader = footerContent.formHeader || [];
							const formHeading = fFormHeader
								.filter((f) => f.heading)
								.map((f) => {
									const { heading, isAboveForm, ...rest } = f;
									return rest;
								});
							const formSubHeading = fFormHeader
								.filter((f) => !f.heading)
								.map((f) => {
									const { isAboveForm, ...rest } = f;
									return rest;
								});
							if (!excludeClassNamesOrIds) {
								textForm = {
									aboveForm: [],
									formHeading,
									formSubHeading,
									belowForm: [],
								};
							}
							footerContent.content.textForm = { ...textForm };
							delete footerContent.formHeader;
						}
					}
				}
				content.contents = content.contents.filter((f) => f.item === "form");
			}

			if (item === "form") {
				let textForm = {
					aboveForm: [],
					formHeading: [],
					formSubHeading: [],
					belowForm: [],
				};
				const { aboveForm, belowForm } = getAdjacentItems(
					[...contents],
					index,
					formHeader
				);
				const formHeading = formHeader
					.filter((f) => f.heading)
					.map((f) => {
						const { heading, isAboveForm, ...rest } = f;
						return rest;
					});
				const formSubHeading = formHeader
					.filter((f) => !f.heading)
					.map((f) => {
						const { isAboveForm, ...rest } = f;
						return rest;
					});
				if (!excludeClassNamesOrIds) {
					textForm = {
						aboveForm,
						formHeading,
						formSubHeading,
						belowForm,
					};
				}

				form.textForm = { ...textForm };
			}
		}

		return {
			url: this.url,
			header: this.header,
			breadcrumbs: this.breadcrumb,
			content: contents,
		};
	}
}

const header = new Header(document);
const breadcrumb = new Breadcrumb(document);
const page = new Page(header, breadcrumb);

console.log(page.getJson());
