<%@ Control Language="C#" AutoEventWireup="true" CodeFile="WebConnectionRequestListLava.ascx.cs" Inherits="RockWeb.Blocks.Connection.WebConnectionRequestListLava" %>

<asp:UpdatePanel ID="upConnectionSelectLava" runat="server">
    <ContentTemplate>
        <div class="row">
            <div class="col-xs-12">
                <h2>
                    <asp:Literal ID="lTitle" runat="server"></asp:Literal>
                </h2>
                <h5>
                    <span class="text-muted"><asp:Literal ID="lSubTitle" runat="server"></asp:Literal></span>
                </h5>
            </div>
            <div class="col-xs-12 pb-2">
                <asp:LinkButton ID="lbOptions" runat="server" CssClass="text-muted text-semibold pull-right pr-1" OnClick="lbOptions_Click"><i class="fa fa-sliders"></i>&nbsp;&nbsp;Options</asp:LinkButton>
            </div>
            <div class="col-xs-12">
                <asp:Literal ID="lContent" runat="server"></asp:Literal>
            </div>
        </div>

        <Rock:ModalDialog ID="mdOptions" runat="server" Title="Options" SaveButtonText="Save" OnSaveClick="mdOptions_SaveClick">
            <Content>
                <div class="row">
                    <div class="col-xs-12">
                        <Rock:Switch
                            ID="swOnlyShowMyConnections"
                            runat="server"
                            Checked="false"
                            FormGroupCssClass="custom-switch-centered hide-label-sm"
                            Text="Only Show My Connections" />
                    </div>
                </div>
                <div class="row pt-2">
                    <div class="col-xs-8">
                        <Rock:RockCheckBoxList ID="cblStates" runat="server" RepeatDirection="Horizontal" Label="Request States" />
                    </div>
                </div>
            </Content>
        </Rock:ModalDialog>
    </ContentTemplate>
</asp:UpdatePanel>
