import { Component, OnInit } from "@angular/core";
import { Color } from "tns-core-modules/color";
import { isIOS } from "tns-core-modules/platform";


@Component({
  selector: 'ns-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  moduleId: module.id,
})
export class ArticlesComponent implements OnInit {

    items: { name: string, desc: string, imageSrc: string }[] = [
        { name: "Elefriends",
        desc: "A supportive online community managed by Mind, the mental health charity. The Ele and his handlers at Mind moderate the community and help to keep it safe. They're available to respond to any questions or help with difficult situations during these hours: 6am-9am and 10am-2am 7 days a week",
        imageSrc: "~/app/images/elefriends.png" },
        { name: "Puppies!", desc: "Probably something in here. But probably not.", imageSrc: "~/app/images/puppy.jpg" },
        { name: "Motorcycle", desc: "It'll be worth the argument with your spouse.", imageSrc: "https://placem.at/things?w=500&txt=0&random=1" },
        { name: "Air Plant", desc: "It looked cool in the store.", imageSrc: "https://placem.at/things?w=500&txt=0&random=2" },
        { name: "Cuff Links", desc: "You'll need them once in the next ten years.", imageSrc: "https://placem.at/things?w=500&txt=0&random=4" },
        { name: "Skateboard", desc: "Too bad you are too old to use it.", imageSrc: "https://placem.at/things?w=500&txt=0&random=7" },
        { name: "Off-Brand Soda", desc: "Desperate times we live in.", imageSrc: "https://placem.at/things?w=500&txt=0&random=8" },
        { name: "Beer? Liquor?", desc: "Mmmmm drinky.", imageSrc: "https://placem.at/things?w=500&txt=0&random=10" },
        { name: "Pie!", desc: "Also good.", imageSrc: "https://placem.at/things?w=500&txt=0&random=11" }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    onItemLoading(args) {
        // hack to get around issue with RadListView ios background colors: https://github.com/telerik/nativescript-ui-feedback/issues/196
        if (isIOS) {
            var newcolor = new Color("#8CBBA9");
            args.ios.backgroundView.backgroundColor = newcolor.ios;
        }
    }
}
