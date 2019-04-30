import { Component, OnInit } from "@angular/core";
import { Color } from "tns-core-modules/color";
import { isIOS } from "tns-core-modules/platform";

@Component({
  selector: 'ns-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  moduleId: module.id,
})
export class ArticlesComponent {

    items: { name: string, desc: string, imageSrc: string }[] = [
        { name: "Elefriends",
        desc: "A supportive online community managed by Mind, the mental health charity. The Ele and his handlers at Mind moderate the community and help to keep it safe. They're available to respond to any questions or help with difficult situations during these hours: 6am-9am and 10am-2am 7 days a week",
        imageSrc: "~/app/images/elefriends.png" },
        { name: "Borrow My Doggy", desc: "BorrowMyDoggy connects dog owners with trusted local people who would love to look after their dog. They make it easy to arrange walks, playtime, overnight stays or holidays. This gives dogs more exercise and playtime and to allow people without a dog to spend quality time with one. https://www.borrowmydoggy.com/", imageSrc: "~/app/images/puppy.jpg" },
        { name: "Motorcycle", desc: "It'll be worth the argument with your spouse.", imageSrc: "https://placem.at/things?w=500&txt=0&random=1" },
        { name: "Air Plant", desc: "It looked cool in the store.", imageSrc: "https://placem.at/things?w=500&txt=0&random=2" },
        { name: "Cuff Links", desc: "You'll need them once in the next ten years.", imageSrc: "https://placem.at/things?w=500&txt=0&random=4" },
        { name: "Skateboard", desc: "Too bad you are too old to use it.", imageSrc: "https://placem.at/things?w=500&txt=0&random=7" },
    ];


    onItemLoading(args) {
        // hack to get around issue with RadListView ios background colors: https://github.com/telerik/nativescript-ui-feedback/issues/196
        if (isIOS) {
            var newcolor = new Color(0, 255, 255, 255);
            args.ios.backgroundView.backgroundColor = newcolor.ios;
        }
    }
}
