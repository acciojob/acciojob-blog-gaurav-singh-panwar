//your JS code here. If required.
describe("Acciojobs Blog", () => {
  const links = {
    link1: {
      href: "https://acciojob.com/blog/brute-force-vs-optimization/",
      img: "Image_one.jpg",
      article_name: "Brute Force vs. Optimization",
      description:
        "We can say that optimization is one step further than the brute-force method of problem solving...",
    },
    link2: {
      href: "https://acciojob.com/blog/dsa-vs-competitive-programming/",
      img: "Image_two.jpg",
      article_name: "DSA vs. Competitive Programming",
      description:
        "DSA or Competitive programming? What is better for you? Questions such as these often put you in a...",
    },
    link3: {
      href: "https://acciojob.com/blog/10-tips-to-optimize-your-linkedin-profile-and-attract-recruiters/",
      img: "Image_three.jpg",
      article_name: "10 Tips to Optimize Your LinkedIn Profile and Attract Recruiters",
      description:
        "As a job seeker, you may wonder how to make your LinkedIn profile stand out to recruiters. Your LinkedIn...",
    },
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the scrolling text", () => {
    cy.get("h1.marquee").should("have.text", "Welcome to Acciojobs!");
  });

  it("should have images with correct heights", () => {
    cy.get("img.blog-image").should("have.length", 3).each(($img) => {
      cy.wrap($img).should("have.attr", "height", "200px");
    });
  });

  it("should have correct links and descriptions", () => {
    Object.keys(links).forEach((key) => {
      const { href, img, article_name, description } = links[key];

      cy.contains("a", article_name)
        .should("have.attr", "href", href)
        .parent()
        .within(() => {
          cy.contains("p", description);
          cy.get("a.blog-link").should("have.attr", "href", href);
        });

      cy.get("img.blog-image").should("have.attr", "src").and("include", img);
    });
  });

  it("should redirect to the correct blog link when clicked", () => {
    cy.contains("a", links.link1.article_name).click();
    cy.url().should("eq", links.link1.href);
    cy.go("back");

    cy.contains("a", links.link2.article_name).click();
    cy.url().should("eq", links.link2.href);
    cy.go("back");

    cy.contains("a", links.link3.article_name).click();
    cy.url().should("eq", links.link3.href);
  });
});
