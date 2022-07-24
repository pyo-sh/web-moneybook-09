import Component from "@core/Component";
import "@components/Header/index.css";
import { a, article, button, div, h1, h2, header, section, span } from "@core/CreateDom";
import { fileTextIcon, calendarIcon, chartIcon } from "@icons";
import downArrowIcon from "@icons/downArrow";
import Route from "@core/Route";

const WHITE = "#ffffff";

export default class Header extends Component {
    onClickATag(e) {
        const aElement = e.target.closest("a");
        if (aElement) {
            e.preventDefault();
            const pathname = aElement.pathname.replace("/", "");
            Route.navigate(pathname);
        }
    }
    render() {
        const { onClickATag } = this;
        // prettier-ignore
        return header({ class: "header" })(
            div({
                class: "wrapper",
                event: {
                    click: onClickATag
                }})
            (
                a({ href: "/" })(h1({ class: "text_display_small" })("우아한 가계부")),
                section({ class: "controller" })(
                    button({ class: "monthMover" })(downArrowIcon(WHITE, 24, 24)),
                    article(
                        h2({ class: "text_display_large" })("7월"),
                        span({ class: "text_display_small" })("2021")
                    ),
                    button({ class: "monthMover" })(downArrowIcon(WHITE, 24, 24)),
                ),
                section(
                    a({ href: "/" })(fileTextIcon(WHITE)),
                    a({ href: "/calendar" })(calendarIcon(WHITE)),
                    a({ href: "/statistic" })(chartIcon(WHITE)),
                ),
            ),
        );
    }
}
