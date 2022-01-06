<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebConnectionOpportunityListLava.ascx.cs" Inherits="RockWeb.Blocks.Connection.WebConnectionOpportunityListLava" %>

<asp:UpdatePanel ID="upConnectionSelectLava" runat="server">
    <ContentTemplate>
        <div class="row">
            <div class="col-xs-12">
                <asp:Literal ID="lTitle" runat="server"></asp:Literal>
            </div>
            <div class="col-xs-12 pb-2">
                <asp:HyperLink ID="hlOptions" runat="server" CssClass="text-muted text-semibold pull-right"><i class="fa fa-sliders"></i>&nbsp;&nbsp;Options</asp:HyperLink>
            </div>
            <div class="col-xs-12">
                <asp:Literal ID="lContent" runat="server"></asp:Literal>
            </div>
        </div>

        <Rock:ModalDialog ID="mdOptions" runat="server" Title="Options" SaveButtonText="Save" OnSaveClick="mdOptions_SaveClick">
            <Content>
                <%-- <div class="row">
                    <div class="col-md-4">
                        <Rock:RockDropDownList ID="ddlMovePersonSchedule" runat="server" Label="Service" AutoPostBack="false" />
                    </div>
                    <div class="col-md-4">
                        <Rock:LocationItemPicker ID="lpMovePersonLocation" runat="server" Label="Location" OnSelectItem="lpMovePersonLocation_SelectItem" EnableFullWidth="true" />
                    </div>
                    <div class="col-md-4">
                        <Rock:RockDropDownList ID="ddlMovePersonGroup" runat="server" Label="Group" AutoPostBack="true" OnSelectedIndexChanged="ddlMovePersonGroup_SelectedIndexChanged" />
                    </div>
                </div>

                <Rock:NotificationBox ID="nbMovePersonLocationFull" runat="server" NotificationBoxType="Warning" />--%>
            </Content>
        </Rock:ModalDialog>
    </ContentTemplate>
</asp:UpdatePanel>
