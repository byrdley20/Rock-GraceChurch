<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebConnectionOpportunityListLava.ascx.cs" Inherits="RockWeb.Blocks.Connection.WebConnectionOpportunityListLava" %>

<asp:UpdatePanel ID="upConnectionSelectLava" runat="server">
    <ContentTemplate>
        <div class="row">
            <div class="col-xs-12">
                <asp:Literal ID="lTitle" runat="server"></asp:Literal>
            </div>
            <div class="col-xs-12 pb-2">
                <asp:LinkButton ID="lbOptions" runat="server" CssClass="text-muted text-semibold pull-right" OnClick="lbOptions_Click"><i class="fa fa-sliders"></i>&nbsp;&nbsp;Options</asp:LinkButton>
            </div>
            <div class="col-xs-12">
                <asp:Literal  ID="lContent" runat="server"></asp:Literal>
            </div>
        </div>

        <Rock:ModalDialog ID="mdOptions" runat="server" Title="Options" SaveButtonText="Save" OnSaveClick="mdOptions_SaveClick">
            <Content>
                 <div class="row">
                    <div class="col-xs-12">
                       <asp:Literal  ID="lToggle" runat="server"></asp:Literal>
                    </div>
                </div>

                <Rock:NotificationBox ID="nbMovePersonLocationFull" runat="server" NotificationBoxType="Warning" />
            </Content>
        </Rock:ModalDialog>
    </ContentTemplate>
</asp:UpdatePanel>
