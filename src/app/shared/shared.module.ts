import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementDetailsComponent } from './element-details/element-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
    declarations: [
        ElementDetailsComponent
    ],
    exports: [
        ElementDetailsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbDropdown,
        NgbDropdownMenu,
        NgbDropdownToggle,
        NgbDropdownItem
    ]
})
export class SharedModule { }
