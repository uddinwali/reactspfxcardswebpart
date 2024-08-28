import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FetchlistWebPartStrings';
import Fetchlist from './components/Fetchlist';
import { IFetchlistProps } from './components/IFetchlistProps';

export interface IFetchlistWebPartProps {
  description: string;
}

export default class FetchlistWebPart extends BaseClientSideWebPart<IFetchlistWebPartProps> {

  //private _isDarkTheme: boolean = false;
  //private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IFetchlistProps> = React.createElement(
      Fetchlist,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
