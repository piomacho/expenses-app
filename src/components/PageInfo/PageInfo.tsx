import * as React from 'react';
import ImageGridList from '../ImageGridList/ImageGridList';
import {
  Wrapper,
  MainParagraph,
  ParagraphsWrapper,
  ListWrapper
} from './PageInfo.styles';

interface PageInfoProps {}

const PageInfo: React.FunctionComponent<PageInfoProps> = props => {
  return (
    <Wrapper>
      <ParagraphsWrapper>
        <MainParagraph>
          Stworzony serwis umożliwia zarządzanie wydatkami, oraz zapewnia
          automatyczne przeliczanie ich na Euro. Aplikacja pobiera z sieci
          aktualny kurs tej waluty. Użytkownik dodatkowo ma możliwosć
          wprowadzania własnych wartości kursu na podstawie którego przeliczane
          są wydatki. Aplikacja jest we właściwy sposób zabezpieczona przed
          wprowadzaniem nieprawidłowych danych. Korzystanie ze stworzonego
          serwisu jest proste i może on zostać użyty w życiu codziennym.
        </MainParagraph>
        <ListWrapper>
          Zastosowane technologie:
          <ul>
            <li>HTML</li>
            <li>Css (Styled Components + Material UI)</li>
            <li>React JS</li>
            <li>TypeScript</li>
            <li>MobX</li>
          </ul>
        </ListWrapper>
      </ParagraphsWrapper>
      <ImageGridList />
    </Wrapper>
  );
};

export default PageInfo;
