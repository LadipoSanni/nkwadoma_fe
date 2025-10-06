import { render, screen } from "@testing-library/react";
import QuillRenderer from '@/components/RenderDangerousHtml';

describe("QuillRenderer", () => {
    it("renders allowed tags safely", () => {
        const dirtyHtml = `
      <p>Hello <strong>World</strong></p>
      <ol><li>One</li><li>Two</li></ol>
    `;

        render(<QuillRenderer html={dirtyHtml} />);

        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("World")).toBeInTheDocument();
        expect(screen.getByText("One")).toBeInTheDocument();
        expect(screen.getByText("Two")).toBeInTheDocument();
    });

    it("strips disallowed tags like <script>", () => {
        const dirtyHtml = `<p>Safe</p><script>alert('XSS')</script>`;
        render(<QuillRenderer html={dirtyHtml} />);

        // script content should not be in DOM
        expect(screen.getByText("Safe")).toBeInTheDocument();
        expect(
            screen.queryByText("alert('XSS')")
        ).not.toBeInTheDocument();
    });

    it("applies the quillContent class", () => {
        const cleanHtml = "<p>Styled Text</p>";
        const { container } = render(<QuillRenderer html={cleanHtml} />);

        expect(container.firstChild).toHaveClass("quillContent");
    });
});
