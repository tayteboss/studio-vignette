import styled from "styled-components";
import HeadingBlock from "../../blocks/HeadingBlock";
import ContentBlock from "../../blocks/ContentBlock";
import ImageGalleryBlock from "../../blocks/ImageGalleryBlock";
import MediaBlock from "../../blocks/MediaBlock";
import ProductGalleryBlock from "../../blocks/ProductGalleryBlock";
import ConsiderationsBlock from "../../blocks/ConsiderationsBlock";
import TestimonialBlock from "../../blocks/TestimonialBlock";

type Props = {
  data: any;
};

const PageBuilderWrapper = styled.div``;

const PageBuilder = (props: Props) => {
  const { data } = props;

  const sections: any = {
    headingBlockPB: HeadingBlock,
    contentBlockPB: ContentBlock,
    imageGalleryBlockPB: ImageGalleryBlock,
    mediaBlockPB: MediaBlock,
    productGalleryBlockPB: ProductGalleryBlock,
    testimonialBlockPB: TestimonialBlock,
    considerationsBlockPB: ConsiderationsBlock,
  };

  return (
    <PageBuilderWrapper className="page-builder">
      {data &&
        data.map((section: any, i: number) => {
          {
            if (!sections[section.component]) {
              return (
                <div key={Math.random() * 10000}>
                  No section found for {section.component}
                </div>
              );
            } else {
              const Component = sections[section.component];
              return (
                <Component key={`${section.component}-${i}`} {...section} />
              );
            }
          }
        })}
    </PageBuilderWrapper>
  );
};

export default PageBuilder;
