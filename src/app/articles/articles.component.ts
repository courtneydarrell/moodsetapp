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
        { name: "Borrow My Doggy", desc: "BorrowMyDoggy connects dog owners with trusted local people who would love to look after their dog. They make it easy to arrange walks, playtime, overnight stays or holidays. This gives dogs more exercise and playtime and to allow people without a dog to spend quality time with one.", imageSrc: "~/app/images/puppy.jpg" },
        { name: "Online Art Classes", desc: "Learning how to draw or paint can be fun but challenging, however 'The Ultimate Drawing Course - Beginner to Advanced' is now on sale on Udemy. With a 4.5 star rating and 11 hours of content, it is definetly worth a try!", imageSrc: "~/app/images/art.jpg" },
        { name: "Help Local Wildlife", desc: "Wildlife can make its home in our gardens in many ways. The RSPB has many tips on how to make your garden wildlife friendly: https://www.rspb.org.uk/birds-and-wildlife/advice/gardening-for-wildlife/creating-a-wildlife-friendly-garden/", imageSrc: "~/app/images/nature.jpg" },
    ];


    onItemLoading(args) {
        // hack to get around issue with RadListView ios background colors: https://github.com/telerik/nativescript-ui-feedback/issues/196
        if (isIOS) {
            var newcolor = new Color(0, 255, 255, 255);
            args.ios.backgroundView.backgroundColor = newcolor.ios;
        }
    }
}
