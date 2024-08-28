import * as React from 'react';
import styles from './Fetchlist.module.scss';
import type { IFetchlistProps } from './IFetchlistProps';
//import { escape } from '@microsoft/sp-lodash-subset';
//import * as jquery from 'jquery';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
export interface IQuickLinksStates {
  items: any;
}

var FullPath = window.location.href;
var arrayOfParts = FullPath.split('/');
const BASEURL = arrayOfParts.slice(0, 5).join("/");

export default class Getlistdemo extends React.Component<IFetchlistProps, IQuickLinksStates> {  //Make sure to make "any" here in the end so that It can use any data type

  public constructor(props: IFetchlistProps){    
    super(props);    
    this.state = {    
      // items: [              //Array with Empty Property Strings
      //   {    
      //     //Properties
      //     "ParentImage" : "",
      //     "ParentHeadings": "",    
      //     "ParentMulti": "",
      //     "ParentDesc" : "",
          
          
            
      //   }    
      // ]
      items: [{}]    
    };    
  }
  
  public render(): React.ReactElement<IFetchlistProps> {
    console.log('item', this.state.items);
    return (
      <div className={styles.container}>
        {this.state.items.map((item: any, index: number) => (
          <div className={styles.box} key={index}>
            <img src={item.ParentImage} alt="Image" />
            <h3>{item.ParentHeadings}</h3>
            {item.ParentMulti !== undefined && item.ParentMulti !== null ? (
              index === 0 ? (
                <ul className="values-list">
                  {item.ParentMulti.split('\n').map((value: string, index: number) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              ) : (
                <p className="values">{item.ParentMulti}</p>
              )
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  public getItems(): void {
    try {
      var requestUrl = BASEURL + "/_api/web/lists/getbytitle('ParentWP')/items?";
      this.props.context.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data: any) => {
 
          var dataArray : any = [];
 
          data.value.map((element : any) => {
            dataArray.push({
              ParentImage: JSON.parse(element.ParentImage).serverRelativeUrl,
              ParentHeadings : element.ParentHeadings,
              ParentMulti : element.ParentMulti,
              ParentDesc : element.ParentDesc
              
            });
          });
 
          this.setState({
            items: dataArray
          });
        });
    } catch (error) {
      console.log("Error while getting items", error);
    }
  }




 
 //Fetching data from SP-List   -- Yahan par for ka loop lagega baad main.
 public componentDidMount() {
  this.getItems();
}
}